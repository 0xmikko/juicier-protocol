// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../helpers/AddressStorage.sol";
import "../interfaces/ILendingProvider.sol";
import "./ProvidersManager.sol";


contract Pool {
    address public owner = msg.sender;
    ProviderManager internal providerManager;


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
        providerManager = ProviderManager(_providersManager);
    }

    function deposit(
        address _provider,
        address _reserve,
        uint256 _amount
    )
        external
        payable
        // onlyUnfreezedReserve(_reserve)
        onlyAmountGreaterThanZero(_amount)
    {
        ILendingProvider lendingP = providerManager.getProviderOrFail(_provider);
        lendingP.deposit(_reserve, _amount);

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
