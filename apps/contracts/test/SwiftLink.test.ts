import { expect } from "chai";
import { viem } from "hardhat";
import { parseEther, getAddress } from "viem";

describe("SwiftLink", function () {
  async function deploySwiftLink() {
    const [owner, user1, user2] = await viem.getWalletClients();
    const swiftLink = await viem.deployContract("SwiftLink");
    const publicClient = await viem.getPublicClient();

    return { swiftLink, owner, user1, user2, publicClient };
  }

  describe("Registration", function () {
    it("Should register a username with metadata", async function () {
      const { swiftLink, user1 } = await deploySwiftLink();
      
      await swiftLink.write.registerUsername(["alice", "ipfs://profile1"], {
        account: user1.account,
      });

      const profile = await swiftLink.read.getProfile(["alice"]);
      expect(profile.username).to.equal("alice");
      expect(profile.metadata).to.equal("ipfs://profile1");
      expect(getAddress(profile.wallet)).to.equal(getAddress(user1.account.address));
    });

    it("Should fail if username is too short", async function () {
      const { swiftLink, user1 } = await deploySwiftLink();
      await expect(
        swiftLink.write.registerUsername(["al", ""], { account: user1.account })
      ).to.be.rejectedWith("Username too short");
    });

    it("Should fail if address already has a username", async function () {
      const { swiftLink, user1 } = await deploySwiftLink();
      await swiftLink.write.registerUsername(["alice", ""], { account: user1.account });
      await expect(
        swiftLink.write.registerUsername(["bob", ""], { account: user1.account })
      ).to.be.rejectedWith("Address already has a username");
    });
  });

  describe("Transfers & Updates", function () {
    it("Should update profile metadata", async function () {
      const { swiftLink, user1 } = await deploySwiftLink();
      await swiftLink.write.registerUsername(["alice", "old"], { account: user1.account });
      await swiftLink.write.updateProfile(["new", true], { account: user1.account });
      
      const profile = await swiftLink.read.getProfile(["alice"]);
      expect(profile.metadata).to.equal("new");
    });

    it("Should transfer username to a new address", async function () {
      const { swiftLink, user1, user2 } = await deploySwiftLink();
      await swiftLink.write.registerUsername(["alice", ""], { account: user1.account });
      await swiftLink.write.transferUsername([user2.account.address], { account: user1.account });
      
      const profile = await swiftLink.read.getProfile(["alice"]);
      expect(getAddress(profile.wallet)).to.equal(getAddress(user2.account.address));
      expect(await swiftLink.read.addressToUsername([user2.account.address])).to.equal("alice");
    });
  });

  describe("Payments", function () {
    it("Should pay a user with native CELO", async function () {
      const { swiftLink, user1, user2, publicClient } = await deploySwiftLink();
      await swiftLink.write.registerUsername(["bob", ""], { account: user2.account });
      
      const amount = parseEther("1");
      const initialBalance = await publicClient.getBalance({ address: user2.account.address });

      await swiftLink.write.payUser(["bob", "0x0000000000000000000000000000000000000000", amount], {
        account: user1.account,
        value: amount,
      });

      const finalBalance = await publicClient.getBalance({ address: user2.account.address });
      expect(finalBalance - initialBalance).to.equal(amount);
    });
  });
});
