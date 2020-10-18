// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;
import "../lib/ERC20.sol";
import "../services/PoolService.sol";

// Vitamin Token
contract VToken is ERC20 {
  // Balance holders queue

  struct QueueItem {
    address previous;
    address next;
    address balanceHolder;
    uint256 amount;
    uint40 startingAssetUsage;
  }

  AddressRepository addressRepository;
  PoolService poolService;
  address underlyingAssetAddress;


  address private firstItem;
  address private lastItem;
  uint256 totalLiquidity;

  mapping(address => QueueItem) private queue;

  uint256 public constant UINT_MAX_VALUE = uint256(-1);

  /**
   * @dev emitted after the mint action
   * @param _from the address performing the mint
   * @param _value the amount to be minted
   * @param _fromBalanceIncrease the cumulated balance since the last update of the user
   * @param _fromIndex the last index of the user
   **/

  event MintOnDeposit(
    address indexed _from,
    uint256 _value,
    uint256 _fromBalanceIncrease,
    uint256 _fromIndex
  );

  modifier poolOnly {
    require(
      msg.sender == address(poolService),
      "Only providers could call this method"
    );
    _;
  }

  constructor(
    // LendingPoolAddressesProvider _addressesProvider,
    address _addressesRepositoryAddress,
    address _underlyingAsset,
    uint8 _underlyingAssetDecimals,
    string memory _name,
    string memory _symbol
  ) public ERC20(_name, _symbol) {

    addressRepository = AddressRepository(_addressesRepositoryAddress);
    poolService = PoolService(addressRepository.getPoolService());
    // addressesProvider = _addressesProvider;
    // core = LendingPoolCore(addressesProvider.getLendingPoolCore());
    // pool = LendingPool(addressesProvider.getLendingPool());
    // dataProvider = LendingPoolDataProvider(addressesProvider.getLendingPoolDataProvider());
    underlyingAssetAddress = _underlyingAsset;
  }

  function isInTheQueue(address _holder) internal view returns (bool) {
    return queue[_holder].balanceHolder == address(0);
  }

  function addBalanceHolder(address _holder, uint256 _amount) public {
    QueueItem memory newItem = QueueItem({
      previous: address(0),
      next: address(0),
      balanceHolder: _holder,
      amount: _amount,
      startingAssetUsage: 0
    });

    if (firstItem != address(0)) {
      newItem.previous = lastItem;
      QueueItem storage previousItem = queue[lastItem];
      previousItem.next = _holder;
    } else {
      firstItem = _holder;
    }
    lastItem = _holder;
    totalLiquidity += _amount;
  }

  function updateQueueAssetsUsage(uint256 _amount) internal {}

  /**
   * @dev mints token in the event of users depositing the underlying asset into the lending pool
   * only lending pools can call this function
   * @param _account the address receiving the minted tokens
   * @param _amount the amount of tokens to mint
   */

  //   Provider only
  function mintOnDeposit(address _account, uint256 _amount) public poolOnly {
    //cumulates the balance of the user
    //   (,
    //   ,
    //   uint256 balanceIncrease,
    //   uint256 index) = cumulateBalanceInternal(_account);

    //    //if the user is redirecting his interest towards someone else,
    //   //we update the redirected balance of the redirection address by adding the accrued interest
    //   //and the amount deposited
    //   updateRedirectedBalanceOfRedirectionAddressInternal(_account, balanceIncrease.add(_amount), 0);
    if (isInTheQueue(_account) == false) {
      addBalanceHolder(_account, _amount);
    }

    //mint an equivalent amount of tokens to cover the new deposit
    _mint(_account, _amount);

    emit MintOnDeposit(_account, _amount, 0, 0);
    //balanceIncrease, index);
  }

  function redeem(uint256 _amount) external {
    require(_amount > 0, "VToken: Amount to redeem needs to be > 0");
    uint256 amountToRedeem = _amount;

    uint256 currentBalance = balanceOf(msg.sender);
    //if amount is equal to uint(-1), the user wants to redeem everything
    if (_amount == UINT_MAX_VALUE) {
      amountToRedeem = currentBalance;
    }

    require(
      amountToRedeem <= currentBalance,
      "VToken: User cannot redeem more than the available balance"
    );

    // burns tokens equivalent to the amount requested
    _burn(msg.sender, amountToRedeem);

    // Remove from queue of balance equals zero
    // executes redeem of the underlying asset
    poolService.redeemUnderlying(
      underlyingAssetAddress,
      msg.sender,
      amountToRedeem
      // currentBalance.sub(amountToRedeem)
    );

    // emit Redeem(msg.sender, amountToRedeem, balanceIncrease, userIndexReset ? 0 : index);
  }

  function burnOnRedeem(address _account, uint256 _amount) public poolOnly {
    _burn(_account, _amount);
  }

  /**
   * @dev returns the principal balance of the user. The principal balance is the last
   * updated stored balance, which does not consider the perpetually accruing interest.
   * @param _user the address of the user
   * @return the principal balance of the user
   **/
  function principalBalanceOf(address _user) external view returns (uint256) {
    return super.balanceOf(_user);
  }

  /**
   * @dev calculates the balance of the user, which is the
   * principal balance + interest generated by the principal balance + interest generated by the redirected balance
   * @param _user the user for which the balance is being calculated
   * @return the total balance of the user
   **/
  function balanceOf(address _user) public override view returns (uint256) {
    return super.balanceOf(_user);
  }

  //  /**
  //     * @dev calculates the total supply of the specific aToken
  //     * since the balance of every single user increases over time, the total supply
  //     * does that too.
  //     * @return the current total supply
  //     **/
  //     function totalSupply() public override virtual view returns(uint256) {

  //         uint256 currentSupplyPrincipal = super.totalSupply();

  //         if(currentSupplyPrincipal == 0){
  //             return 0;
  //         }

  //         return currentSupplyPrincipal;
  //             // .wadToRay()
  //             // .rayMul(core.getReserveNormalizedIncome(underlyingAssetAddress))
  //             // .rayToWad();
  //     }
}
