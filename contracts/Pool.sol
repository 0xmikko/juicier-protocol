pragma solidity ^0.5.0;

import "core/AddressStorage.sol"

contract Pool {
  address public owner = msg.sender;

  AddressStorage reserves;

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
    require(msg.sender == owner, "This function could be called by owner only")
  }

    function deposit(address _reserve, uint256 _amount, uint16 _referralCode)
        external
        payable
        // onlyUnfreezedReserve(_reserve)
        onlyAmountGreaterThanZero(_amount)
    {
    }

}