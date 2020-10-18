// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../libraries/EthAddressLib.sol";
import "../helpers/AddressStorage.sol";
import "../interfaces/ILendingProvider.sol";
import "./ProvidersManager.sol";
import "../token/VToken.sol";
import "../token/SafeERC20.sol";

contract Pool {
  using SafeMath for uint256;
  using SafeERC20 for ERC20;
  //   using WadRayMath for uint256;
  address public owner = msg.sender;
  ProvidersManager internal providersManager;

  struct Reserve {
    uint256 totalLiquidity;
    uint256 availableLiquidity;
    address vTokenContract;
    bool isActive;
  }

  mapping(address => Reserve) reserves;

      /**
    * @dev emitted during a redeem action.
    * @param _reserve the address of the reserve
    * @param _user the address of the user
    * @param _amount the amount to be deposited
    * @param _timestamp the timestamp of the action
    **/
    event RedeemUnderlying(
        address indexed _reserve,
        address indexed _user,
        uint256 _amount,
        uint256 _timestamp
    );


  modifier activeReserveOnly(address _reserve) {
    require(reserves[_reserve].isActive, "Pool: Reserve is not active");
    _;
  }

  function addReserve(address _reserve, address _vTokenAddress)
    public
    onlyOwner
  {
    reserves[_reserve].vTokenContract = _vTokenAddress;
    reserves[_reserve].isActive = true;
  }

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
    require(msg.sender == owner, "This function could be called by owner only");
    _;
  }

  constructor(address _providersManager) public {
    providersManager = ProvidersManager(_providersManager);
  }

  function deposit(address _reserve, uint256 _amount)
    external
    payable
    activeReserveOnly(_reserve)
    onlyAmountGreaterThanZero(_amount)
  {
    address providerAddress = providersManager
      .getProviderWithHighestLiquidityRate(_reserve);

    ILendingProvider provider = providersManager.getProviderOrFail(
      providerAddress
    );

    // Transfer tokens to Pool contract and provide allowance
    transferToReserve(_reserve, msg.sender, providerAddress, _amount);

    // Approve for provider
    provider.deposit(_reserve, _amount);

    reserves[_reserve].totalLiquidity = reserves[_reserve].totalLiquidity.add(
      _amount
    );
    reserves[_reserve].totalLiquidity = reserves[_reserve].totalLiquidity.add(
      _amount
    );

    VToken token = VToken(reserves[_reserve].vTokenContract);
    token.mintOnDeposit(msg.sender, _amount);
  }

  function redeemUnderlying(
    address _reserve,
    address payable _user,
    uint256 _amount
  ) external activeReserveOnly(_reserve) onlyAmountGreaterThanZero(_amount) {
    require(
      providersManager.getAvaibleLiquidity(_reserve) > _amount,
      "Pool: There is not enough liquidity available to redeem"
    );

    // ToDo: Add check that msg.sender has enough tokens!

    uint256 _amountLeft = _amount;
    while (_amountLeft > 0) {
      (address providerAddress, uint256 avaibleLiquidity) = providersManager
        .getProviderWithLowestLiquidityRate(_reserve);

      // Calculate max sum we could take from this provider
      uint256 sumToRedeem = _amountLeft < avaibleLiquidity
        ? _amountLeft
        : avaibleLiquidity;
      ILendingProvider provider = ILendingProvider(providerAddress);

      // Redeem this sum
      provider.redeemUnderlying(_reserve, _user, sumToRedeem);

      // ToDo: substract tokens(!)
      _amountLeft = _amountLeft.sub(sumToRedeem);
    }

  emit RedeemUnderlying(_reserve, _user, _amount, uint40(block.timestamp));


  }

  /**
   * @notice internal function to save on code size for the onlyAmountGreaterThanZero modifier
   **/
  function requireAmountGreaterThanZeroInternal(uint256 _amount) internal pure {
    require(_amount > 0, "Pool: Amount must be greater than 0");
  }

  /**
   * @dev transfers an amount from a user to the destination reserve
   * @param _reserve the address of the reserve where the amount is being transferred
   * @param _user the address of the user from where the transfer is happening
   * @param _amount the amount being transferred
   **/
  function transferToReserve(
    address _reserve,
    address payable _user,
    address _to,
    uint256 _amount
  ) internal {
    if (_reserve != EthAddressLib.ethAddress()) {
      require(
        msg.value == 0,
        "Pool: User is sending ETH along with the ERC20 transfer."
      );

      ERC20(_reserve).safeTransferFrom(_user, _to, _amount);
    } else {
      require(
        msg.value >= _amount,
        "Pool: The amount and the value sent to deposit do not match"
      );

      if (msg.value > _amount) {
        //send back excess ETH
        uint256 excessAmount = msg.value.sub(_amount);
        //solium-disable-next-line
        (bool result, ) = _user.call.value(excessAmount).gas(50000)("");
        require(result, "Pool: Transfer of ETH failed");
      }
    }
  }
}
