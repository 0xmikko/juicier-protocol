// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../providers/aave-protocol/IAaveLendingPool.sol";

contract AaveLendingPoolMock is IAaveLendingPool {
    address[] private reserves;
    mapping(address => ReserveData) reserveData;
    string mockId;
    //    LendingPoolCore public core;

    /**
     * @dev emitted on deposit
     * @param _reserve the address of the reserve
     * @param _user the address of the user
     * @param _amount the amount to be deposited
     * @param _referral the referral number of the action
     * @param _timestamp the timestamp of the action
     **/
    event DepositMock(
        address indexed _reserve,
        address indexed _user,
        uint256 _amount,
        uint16 indexed _referral,
        uint256 _timestamp,
        string _mockId
    );

    /**
     * @dev Redeems the underlying amount of assets requested by _user.
     * This function is executed by the overlying aToken contract in response to a redeem action.
     * @param _reserve the address of the reserve
     * @param _user the address of the user performing the action
     * @param _amount the underlying amount to be redeemed
     **/
    event RedeemMock(
        address indexed _reserve,
        address indexed _user,
        uint256 _amount,
        uint256 _timestamp,
        string _mockId
    );

    struct ReserveData {
        uint256 totalLiquidity;
        uint256 availableLiquidity;
        uint256 totalBorrowsStable;
        uint256 totalBorrowsVariable;
        uint256 liquidityRate;
        uint256 variableBorrowRate;
        uint256 stableBorrowRate;
        uint256 averageStableBorrowRate;
        uint256 utilizationRate;
        uint256 liquidityIndex;
        uint256 variableBorrowIndex;
        address aTokenAddress;
        uint40 lastUpdateTimestamp;
    }

    function setMockId(string memory _mockId) external {
        mockId = _mockId;
    }

    function deposit(
        address _reserve,
        uint256 _amount,
        uint16 _referralCode
    ) external override payable {
        //        AToken aToken = AToken(core.getReserveATokenAddress(_reserve));
        //
        //        bool isFirstDeposit = aToken.balanceOf(msg.sender) == 0;
        //
        //        core.updateStateOnDeposit(_reserve, msg.sender, _amount, isFirstDeposit);
        //
        //        //minting AToken to user 1:1 with the specific exchange rate
        //        aToken.mintOnDeposit(msg.sender, _amount);
        //
        //        //transfer to the core contract
        //        core.transferToReserve.value(msg.value)(_reserve, msg.sender, _amount);

        reserveData[_reserve].totalLiquidity += _amount;
        reserveData[_reserve].availableLiquidity += _amount;
        //solium-disable-next-line
        emit DepositMock(
            _reserve,
            msg.sender,
            _amount,
            _referralCode,
            block.timestamp,
            mockId
        );
    }

    function redeemUnderlying(
        address _reserve,
        address payable _user,
        uint256 _amount,
        uint256 _aTokenBalanceAfterRedeem
    ) external override {
        require(
            reserveData[_reserve].availableLiquidity >= _amount,
            "Not enough liquidity"
        );
        reserveData[_reserve].totalLiquidity -= _amount;
        reserveData[_reserve].availableLiquidity -= _amount;
        //solium-disable-next-line
        emit RedeemMock(_reserve, _user, _amount, block.timestamp, mockId);
    }

    function setReserve(
        address _reserveAddress,
        // reserve total liquidity
        uint256 _totalLiquidity,
        //reserve available liquidity for borrowing
        uint256 _availableLiquidity,
        //the total borrows of the reserve at a stable rate. Expressed in the currency decimals
        uint256 _totalBorrowsStable,
        //the total borrows of the reserve at a variable rate. Expressed in the currency decimals
        uint256 _totalBorrowsVariable,
        //the current supply rate. Expressed in ray
        uint256 _liquidityRate,
        //current variable rate APY of the reserve pool, in Ray units.
        uint256 _variableBorrowRate,
        //current stable rate APY of the reserve pool, in Ray units.
        uint256 _stableBorrowRate,
        //current average stable borrow rate
        uint256 _averageStableBorrowRate,
        // expressed as total borrows/total liquidity.
        uint256 _utilizationRate,
        // cumulative liquidity index
        uint256 _liquidityIndex,
        // cumulative variable borrow index
        uint256 _variableBorrowIndex,
        // aTokens contract address for the specific _reserve
        address _aTokenAddress,
        // timestamp of the last update of reserve data
        uint40 _lastUpdateTimestamp
    ) external {
        // Add reserve to list if doesn't exist
        addToReserveIfNotExists(_reserveAddress);
        setReserveData(
            _reserveAddress,
            _totalLiquidity,
            _availableLiquidity,
            _totalBorrowsStable,
            _totalBorrowsVariable,
            _liquidityRate,
            _variableBorrowRate,
            _stableBorrowRate,
            _averageStableBorrowRate,
            _lastUpdateTimestamp
        );

        setReserveDataAdditional(
            _reserveAddress,
            _utilizationRate,
            _liquidityIndex,
            _variableBorrowIndex,
            _aTokenAddress,
            _lastUpdateTimestamp
        );
    }


    // Check that reserve exists in reserve array 
    // If no, it adds it
    function addToReserveIfNotExists(address _reserve) internal {
        if (reserveData[_reserve].lastUpdateTimestamp == 0) {
            reserves.push(_reserve);
        }
    }

    function setReserveData(
        address _reserveAddress,
        uint256 _totalLiquidity,
        //reserve available liquidity for borrowing
        uint256 _availableLiquidity,
        //the total borrows of the reserve at a stable rate. Expressed in the currency decimals
        uint256 _totalBorrowsStable,
        //the total borrows of the reserve at a variable rate. Expressed in the currency decimals
        uint256 _totalBorrowsVariable,
        //the current supply rate. Expressed in ray
        uint256 _liquidityRate,
        //current variable rate APY of the reserve pool, in Ray units.
        uint256 _variableBorrowRate,
        uint256 _stableBorrowRate,
        //current average stable borrow rate
        uint256 _averageStableBorrowRate,
        uint40 _lastUpdateTimestamp
    ) internal {
        ReserveData storage reserve = reserveData[_reserveAddress];
        reserve.totalLiquidity = _totalLiquidity;
        reserve.availableLiquidity = _availableLiquidity;
        reserve.totalBorrowsStable = _totalBorrowsStable;
        reserve.totalBorrowsVariable = _totalBorrowsVariable;
        reserve.liquidityRate = _liquidityRate;
        reserve.variableBorrowRate = _variableBorrowRate;
        reserve.stableBorrowRate = _stableBorrowRate;
        reserve.averageStableBorrowRate = _averageStableBorrowRate;
        reserve.lastUpdateTimestamp = _lastUpdateTimestamp;
    }

    function setReserveDataAdditional(
        address _reserveAddress,
        // expressed as total borrows/total liquidity.
        uint256 _utilizationRate,
        // cumulative liquidity index
        uint256 _liquidityIndex,
        // cumulative variable borrow index
        uint256 _variableBorrowIndex,
        // aTokens contract address for the specific _reserve
        address _aTokenAddress,
        // timestamp of the last update of reserve data
        uint40 _lastUpdateTimestamp
    ) internal {
        ReserveData storage reserve = reserveData[_reserveAddress];
        reserve.utilizationRate = _utilizationRate;
        reserve.liquidityIndex = _liquidityIndex;
        reserve.variableBorrowIndex = _variableBorrowIndex;
        reserve.aTokenAddress = _aTokenAddress;
        reserve.lastUpdateTimestamp = _lastUpdateTimestamp;
    }

    function getReserves() external override view returns (address[] memory) {
        return reserves;
    }

    function getReserveData(address _reserveAddress)
        external
        override
        view
        returns (
            uint256 totalLiquidity,
            uint256 availableLiquidity,
            uint256 totalBorrowsStable,
            uint256 totalBorrowsVariable,
            uint256 liquidityRate,
            uint256 variableBorrowRate,
            uint256 stableBorrowRate,
            uint256 averageStableBorrowRate,
            uint256 utilizationRate,
            uint256 liquidityIndex,
            uint256 variableBorrowIndex,
            address aTokenAddress,
            uint40 lastUpdateTimestamp
        )
    {
        totalLiquidity = reserveData[_reserveAddress].totalLiquidity;
        availableLiquidity = reserveData[_reserveAddress].availableLiquidity;
        totalBorrowsStable = reserveData[_reserveAddress].totalBorrowsStable;
        totalBorrowsVariable = reserveData[_reserveAddress]
            .totalBorrowsVariable;
        liquidityRate = reserveData[_reserveAddress].liquidityRate;
        variableBorrowRate = reserveData[_reserveAddress].variableBorrowRate;
        stableBorrowRate = reserveData[_reserveAddress].stableBorrowRate;
        averageStableBorrowRate = reserveData[_reserveAddress]
            .averageStableBorrowRate;
        utilizationRate = reserveData[_reserveAddress].utilizationRate;
        liquidityIndex = reserveData[_reserveAddress].liquidityIndex;
        variableBorrowIndex = reserveData[_reserveAddress].variableBorrowIndex;
        aTokenAddress = reserveData[_reserveAddress].aTokenAddress;
        lastUpdateTimestamp = reserveData[_reserveAddress].lastUpdateTimestamp;
    }
}
