// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract VitaminToken is ERC20 {
    
    struct QueueItem {
        address previous;
        address next;
        address balanceHolder;
        uint256 amount;
        uint40 startingAssetUsage;
    }

    address private firstItem;
    address private lastItem;
    uint256 totalLiquidity;
    uint256 borrowedLiquidity;

    mapping(address => QueueItem) private queue;

       constructor(
        // LendingPoolAddressesProvider _addressesProvider,
        // address _underlyingAsset,
        uint8 _underlyingAssetDecimals,
        string memory _name,
        string memory _symbol
    ) public ERC20(_name, _symbol) {

        // addressesProvider = _addressesProvider;
        // core = LendingPoolCore(addressesProvider.getLendingPoolCore());
        // pool = LendingPool(addressesProvider.getLendingPool());
        // dataProvider = LendingPoolDataProvider(addressesProvider.getLendingPoolDataProvider());
        // underlyingAssetAddress = _underlyingAsset;
    }

    function isFirstDeposit(address _holder) external view returns (bool) {
        return queue[_holder].balanceHolder == address(0);
    }

    modifier hasEnoughToBorrow(uint256 _amount) {
        require(totalLiquidity >= borrowedLiquidity + _amount, "Not enough liquidity to borrow");
        _;
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

    function getBorrowed(uint256 _amount) public hasEnoughToBorrow(_amount) {
         updateQueueAssetsUsage(_amount);
        borrowedLiquidity += _amount;
       

    }

    function  updateQueueAssetsUsage(uint256 _amount) internal {
    }

/**
     * @dev mints token in the event of users depositing the underlying asset into the lending pool
     * only lending pools can call this function
     * @param _account the address receiving the minted tokens
     * @param _amount the amount of tokens to mint
     */


     // Lending pool only
    // function mintOnDeposit(address _account, uint256 _amount)  {

    //     //cumulates the balance of the user
    //     (,
    //     ,
    //     uint256 balanceIncrease,
    //     uint256 index) = cumulateBalanceInternal(_account);

    //      //if the user is redirecting his interest towards someone else,
    //     //we update the redirected balance of the redirection address by adding the accrued interest
    //     //and the amount deposited
    //     updateRedirectedBalanceOfRedirectionAddressInternal(_account, balanceIncrease.add(_amount), 0);

    //     //mint an equivalent amount of tokens to cover the new deposit
    //     _mint(_account, _amount);

    //     emit MintOnDeposit(_account, _amount, balanceIncrease, index);
    // }



       /**
    * @dev returns the principal balance of the user. The principal balance is the last
    * updated stored balance, which does not consider the perpetually accruing interest.
    * @param _user the address of the user
    * @return the principal balance of the user
    **/
    function principalBalanceOf(address _user) external view returns(uint256) {
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