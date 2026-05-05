// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SwiftLink is Ownable {
    // Mapping from username to address
    mapping(string => address) public usernameToAddress;
    // Mapping from address to username
    mapping(address => string) public addressToUsername;

    event ProfileRegistered(address indexed user, string username);
    event PaymentReceived(address indexed from, address indexed to, uint256 amount, address token);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Register a unique username for a wallet address
     */
    function registerUsername(string memory _username) external {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(usernameToAddress[_username] == address(0), "Username already taken");
        require(bytes(addressToUsername[msg.sender]).length == 0, "Address already has a username");

        usernameToAddress[_username] = msg.sender;
        addressToUsername[msg.sender] = _username;

        emit ProfileRegistered(msg.sender, _username);
    }
}
