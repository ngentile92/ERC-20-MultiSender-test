// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;

library SafeMath {
    function mul(uint a, uint b) internal pure returns(uint) {
        uint c = a * b;
        require(a == 0 || c / a == b);
        return c;
    }
    function div(uint a, uint b) internal pure returns(uint) {
        require(b > 0);
        uint c = a / b;
        require(a == b * c + a % b);
        return c;
    }
    function sub(uint a, uint b) internal pure returns(uint) {
        require(b <= a);
        return a - b;
    }
    function add(uint a, uint b) internal pure returns(uint) {
        uint c = a + b;
        require(c >= a);
        return c;
    }
    function max64(uint64 a, uint64 b) internal pure returns(uint64) {
        return a >= b ? a: b;
    }
    function min64(uint64 a, uint64 b) internal pure returns(uint64) {
        return a < b ? a: b;
    }
    function max256(uint256 a, uint256 b) internal pure returns(uint256) {
        return a >= b ? a: b;
    }
    function min256(uint256 a, uint256 b) internal pure returns(uint256) {
        return a < b ? a: b;
    }
}


interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract BulkSender {

    using SafeMath for uint;

    event LogTokenBulkSent(IERC20 token, uint256 total);
    event LogGetToken(address token, address receiver, uint256 balance);

        function multisend_eth(address payable [] calldata _to, uint[] calldata _value) payable public {

        uint remainingValue = msg.value;        

        require(_to.length == _value.length);
        require(_to.length <= 255);

        for (uint8 i = 1; i < _to.length; i++) {
            remainingValue = remainingValue.sub(_value[i]);
            require(_to[i].send(_value[i]));
        }
    }

// Something is missing here, I should need the _tokencontract, _from, _to, and _value

    function multisend_tokens(IERC20 _tokenAddress, address[] calldata _to, uint[] calldata _value) public {
        require(_to.length == _value.length);
        require(_to.length <= 255);

        uint256 sendAmount = _value[0];
        IERC20 token = IERC20(_tokenAddress);

        for (uint8 i = 0; i < _to.length; i++) {
            token.transferFrom(msg.sender, _to[i], _value[i]);
        }
        emit LogTokenBulkSent(_tokenAddress, sendAmount);
    }
}