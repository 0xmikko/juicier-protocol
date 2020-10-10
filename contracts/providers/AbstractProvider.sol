// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../interfaces/ILendingProvider.sol";

abstract contract AbstractProvider is ILendingProvider {
    string internal _name;



    constructor(string memory name) public {
        _name = name;
    }
}
