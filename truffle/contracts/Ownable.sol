// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Ownable {
    address public _owner;

    constructor () {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }


    function isOwner() public view returns (bool) {
        return (msg.sender == _owner);
    }
}