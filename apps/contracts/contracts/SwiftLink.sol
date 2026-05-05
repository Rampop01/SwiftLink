// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SwiftLink
 * @dev On-chain registry for usernames and payment routing on Celo.
 */
contract SwiftLink is Ownable, ReentrancyGuard {
    struct Profile {
        string username;
        address wallet;
        string metadata; // IPFS CID for bio, pfp, socials
        bool isActive;
        uint256 createdAt;
    }

    // Mapping from username to Profile
    mapping(string => Profile) public profiles;
    // Mapping from address to username
    mapping(address => string) public addressToUsername;

    event ProfileRegistered(address indexed user, string username, string metadata);
    event ProfileUpdated(address indexed user, string username, string metadata, bool isActive);
    event UsernameTransferred(string username, address indexed oldWallet, address indexed newWallet);
    event PaymentReceived(address indexed from, address indexed to, uint256 amount, address token);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Register a unique username for a wallet address
     */
    function registerUsername(string memory _username, string memory _metadata) external {
        require(bytes(_username).length >= 3, "Username too short");
        require(bytes(_username).length <= 20, "Username too long");
        require(profiles[_username].wallet == address(0), "Username already taken");
        require(bytes(addressToUsername[msg.sender]).length == 0, "Address already has a username");

        profiles[_username] = Profile({
            username: _username,
            wallet: msg.sender,
            metadata: _metadata,
            isActive: true,
            createdAt: block.timestamp
        });
        
        addressToUsername[msg.sender] = _username;

        emit ProfileRegistered(msg.sender, _username, _metadata);
    }

    /**
     * @dev Update profile metadata or active status
     */
    function updateProfile(string memory _metadata, bool _isActive) external {
        string memory username = addressToUsername[msg.sender];
        require(bytes(username).length > 0, "No profile found");

        profiles[username].metadata = _metadata;
        profiles[username].isActive = _isActive;

        emit ProfileUpdated(msg.sender, username, _metadata, _isActive);
    }

    /**
     * @dev Transfer username to a new address
     */
    function transferUsername(address _newWallet) external {
        require(_newWallet != address(0), "Invalid address");
        require(bytes(addressToUsername[_newWallet]).length == 0, "Recipient already has a username");
        
        string memory username = addressToUsername[msg.sender];
        require(bytes(username).length > 0, "No profile found");

        // Update mappings
        addressToUsername[_newWallet] = username;
        delete addressToUsername[msg.sender];
        
        profiles[username].wallet = _newWallet;

        emit UsernameTransferred(username, msg.sender, _newWallet);
    }

    /**
     * @dev Send a payment to a user by their username
     * Supports both Native CELO (token = address(0)) and ERC20 tokens.
     */
    function payUser(string memory _username, address _token, uint256 _amount) external payable nonReentrant {
        address recipient = profiles[_username].wallet;
        require(recipient != address(0), "User not found");
        require(profiles[_username].isActive, "User profile is inactive");
        require(_amount > 0, "Amount must be greater than 0");

        if (_token == address(0)) {
            require(msg.value == _amount, "Incorrect CELO amount");
            (bool success, ) = payable(recipient).call{value: _amount}("");
            require(success, "CELO transfer failed");
        } else {
            IERC20 token = IERC20(_token);
            require(token.transferFrom(msg.sender, recipient, _amount), "Token transfer failed");
        }

        emit PaymentReceived(msg.sender, recipient, _amount, _token);
    }

    /**
     * @dev Helper to get full profile data
     */
    function getProfile(string memory _username) external view returns (Profile memory) {
        return profiles[_username];
    }
}
