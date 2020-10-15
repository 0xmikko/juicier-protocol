// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../helpers/AddressStorage.sol";
import "../interfaces/ILendingProvider.sol";
import "./ProvidersManager.sol";

contract Pool {
    address public owner = msg.sender;
    ProvidersManager internal providersManager;

    /**
     * @dev functions affected by this modifier can only be invoked if the provided _amount input parameter
     * is not zero.
     * @param _amount the amount provided
     **/
    modifier onlyAmountGreaterThanZero(uint256 _amount) {
        requireAmountGreaterThanZeroInternal(_amount);
        _;
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "This function could be called by owner only"
        );
        _;
    }

    constructor(address _providersManager) public {
        providersManager = ProvidersManager(_providersManager);
    }

    function deposit(address _reserve, uint256 _amount)
        external
        payable
        // onlyUnfreezedReserve(_reserve)
        onlyAmountGreaterThanZero(_amount)
    {
        address provider = providersManager.getProviderWithHighestLiquidityRate(
            _reserve
        );
        ILendingProvider lendingP = providersManager.getProviderOrFail(
            provider
        );
        lendingP.deposit(_reserve, _amount);
    }

    function redeem(address _reserve, uint256 _amount)
        external
        onlyAmountGreaterThanZero(_amount)
    {
        require(
            providersManager.getAvaibleLiquidity(_reserve) > _amount,
            "There is not enough liquidity available to redeem"
        );

        // ToDo: Add check that msg.sender has enough tokens!

        uint256 _amountLeft = _amount;
        while (_amountLeft > 0) {
            (
                address providerAddress,
                uint256 avaibleLiquidity
            ) = providersManager.getProviderWithLowestLiquidityRate(_reserve);

            // Calculate max sum we could take from this provider
            uint256 sumToRedeem = avaibleLiquidity > _amount
                ? _amount
                : avaibleLiquidity;
            ILendingProvider provider = ILendingProvider(providerAddress);

            // Redeem this sum
            provider.redeemUnderlying(_reserve, msg.sender, _amount);

            // ToDo: substract tokens(!)

            // ToDo: provide normal math
            _amountLeft -= sumToRedeem;
        }
    }

    /**
     * @notice internal function to save on code size for the onlyAmountGreaterThanZero modifier
     **/
    function requireAmountGreaterThanZeroInternal(uint256 _amount)
        internal
        pure
    {
        require(_amount > 0, "Amount must be greater than 0");
    }
}
