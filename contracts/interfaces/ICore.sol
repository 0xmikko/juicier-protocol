// SPDX-License-Identifier: agpl-3.0
pragma solidity >=0.6.10;

interface ICore {
     function deposit(address lendingProvider, address asset, uint256 amount) external;
}