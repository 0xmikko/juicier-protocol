// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;
import "../lib/ERC20.sol";

contract DAIMockToken is ERC20 {
  constructor(string memory _name, string memory _symbol)
    public
    ERC20(_name, _symbol)
  {}

  function mint(address _to, uint256 _amount) external {
    _mint(_to, _amount);
  }
}
