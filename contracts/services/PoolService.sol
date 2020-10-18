// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

import "../core/ILendingProvider.sol";
import "../lib/AddressStorage.sol";
import "../lib/SafeERC20.sol";
import "../lib/ERC20.sol";
import "../lib/EthAddressLib.sol";
import "../lib/WadRayMath.sol";
import "../repositories/ReserveRepository.sol";
import "../services/ProviderService.sol";
import "../token/VToken.sol";

contract PoolService is Ownable {
  using SafeMath for uint256;
  using SafeERC20 for ERC20;
  using WadRayMath for uint256;

  AddressRepository private addressRepository;
  ProviderService internal providerService;
  ProviderRepository internal providerRepository;
  ReserveRepository private reserveRepository;

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


  constructor(address _addressRepository) public {

    addressRepository = AddressRepository(_addressRepository);
    providerService = ProviderService(addressRepository.getProviderService());
    providerRepository = ProviderRepository(addressRepository.getProviderRepository());
    reserveRepository = ReserveRepository(addressRepository.getReserveRepository());

  }

  modifier activeReserveOnly(address _reserve) {
    require(
      reserveRepository.isReserveActive(_reserve),
      "Pool: Reserve is not active"
    );
    _;
  }

  function addReserve(address _reserve, address _vTokenAddress)
    public
    onlyOwner
  {
    reserveRepository.setTokenContract(_reserve, _vTokenAddress);
    reserveRepository.setActive(_reserve, true);
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

  function deposit(address _reserve, uint256 _amount)
    external
    payable
    activeReserveOnly(_reserve)
    onlyAmountGreaterThanZero(_amount)
  {
    address providerAddress = providerService
      .getProviderWithHighestLiquidityRate(_reserve);

    ILendingProvider provider = providerRepository.getProviderByAddressOrFail(
      providerAddress
    );

    // Transfer tokens to Pool contract and provide allowance
    transferToReserve(_reserve, msg.sender, providerAddress, _amount);

    // Approve for provider
    provider.deposit(_reserve, _amount);

    uint256 updatedTotalLiquidity = reserveRepository.getTotalLiquidity(_reserve).add(
      _amount
    );
    uint256 updatedAvailableLiquidity = reserveRepository
      .getAvailableLiquidity(_reserve)
      .add(_amount);

    reserveRepository.setTotalLiquidity(_reserve, updatedTotalLiquidity);
    reserveRepository.setAvailableLiquidity(_reserve, updatedAvailableLiquidity);

    VToken token = reserveRepository.getVTokenContract(_reserve);
    token.mintOnDeposit(msg.sender, _amount);
  }

  function redeemUnderlying(
    address _reserve,
    address payable _user,
    uint256 _amount
  ) external activeReserveOnly(_reserve) onlyAmountGreaterThanZero(_amount) {
    require(
      providerService.getTotalAvaibleLiquidity(_reserve) > _amount,
      "Pool: There is not enough liquidity available to redeem"
    );

    // ToDo: Add check that msg.sender has enough tokens!

    uint256 _amountLeft = _amount;
    while (_amountLeft > 0) {
      (address providerAddress, uint256 avaibleLiquidity) = providerService
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

    uint256 updatedTotalLiquidity = reserveRepository.getTotalLiquidity(_reserve).sub(
      _amount
    );
    uint256 updatedAvailableLiquidity = reserveRepository
      .getAvailableLiquidity(_reserve)
      .sub(_amount);

    reserveRepository.setTotalLiquidity(_reserve, updatedTotalLiquidity);
    reserveRepository.setAvailableLiquidity(_reserve, updatedAvailableLiquidity);

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
