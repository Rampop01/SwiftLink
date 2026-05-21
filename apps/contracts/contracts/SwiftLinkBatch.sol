// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface ISwiftLink {
    function profiles(string memory _username) external view returns (
        string memory username,
        address wallet,
        string memory metadata,
        bool isActive,
        uint256 createdAt
    );
}

/**
 * @title SwiftLinkBatch
 * @dev Sidecar contract to execute batch payments using SwiftLink's on-chain registry.
 */
contract SwiftLinkBatch is ReentrancyGuard {
    ISwiftLink public immutable registry;

    event BatchPaymentCompleted(address indexed sender, uint256 totalAmount, address token, uint256 recipientCount);

    constructor(address _registryAddress) {
        require(_registryAddress != address(0), "Invalid registry address");
        registry = ISwiftLink(_registryAddress);
    }

    /**
     * @dev Send payments to multiple users by their usernames
     * @param _usernames Array of recipient usernames
     * @param _token Token address (address(0) for native CELO)
     * @param _amounts Array of amounts corresponding to each username
     */
    function batchPayUsers(
        string[] calldata _usernames,
        address _token,
        uint256[] calldata _amounts
    ) external payable nonReentrant {
        require(_usernames.length > 0, "Empty batch");
        require(_usernames.length == _amounts.length, "Array length mismatch");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            totalAmount += _amounts[i];
        }

        if (_token == address(0)) {
            require(msg.value == totalAmount, "Incorrect CELO amount provided");
            for (uint256 i = 0; i < _usernames.length; i++) {
                (, address wallet, , bool isActive, ) = registry.profiles(_usernames[i]);
                require(wallet != address(0), string(abi.encodePacked("User not found: ", _usernames[i])));
                require(isActive, string(abi.encodePacked("User inactive: ", _usernames[i])));
                require(_amounts[i] > 0, "Amount must be greater than 0");

                (bool success, ) = payable(wallet).call{value: _amounts[i]}("");
                require(success, "CELO transfer failed");
            }
        } else {
            require(msg.value == 0, "Native CELO sent with ERC20 request");
            IERC20 token = IERC20(_token);
            
            // Transfer total amount from sender to this contract first
            require(token.transferFrom(msg.sender, address(this), totalAmount), "Token transferFrom failed");

            for (uint256 i = 0; i < _usernames.length; i++) {
                (, address wallet, , bool isActive, ) = registry.profiles(_usernames[i]);
                require(wallet != address(0), string(abi.encodePacked("User not found: ", _usernames[i])));
                require(isActive, string(abi.encodePacked("User inactive: ", _usernames[i])));
                require(_amounts[i] > 0, "Amount must be greater than 0");

                // Transfer from this contract to recipient
                require(token.transfer(wallet, _amounts[i]), "Token transfer failed");
            }
        }

        emit BatchPaymentCompleted(msg.sender, totalAmount, _token, _usernames.length);
    }
}
