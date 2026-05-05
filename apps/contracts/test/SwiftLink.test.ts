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
  });

  describe("Admin Functions", function () {
    it("Should allow admin to deactivate a profile", async function () {
      const { swiftLink, owner, user1 } = await deploySwiftLink();
      await swiftLink.write.registerUsername(["malicious", ""], { account: user1.account });
      
      await swiftLink.write.adminDeactivateProfile(["malicious", "offensive content"], {
        account: owner.account,
      });

      const profile = await swiftLink.read.getProfile(["malicious"]);
      expect(profile.isActive).to.be.false;
    });

    it("Should fail if non-owner tries to deactivate a profile", async function () {
      const { swiftLink, user1, user2 } = await deploySwiftLink();
      await swiftLink.write.registerUsername(["alice", ""], { account: user1.account });
      
      await expect(
        swiftLink.write.adminDeactivateProfile(["alice", "reason"], { account: user2.account })
      ).to.be.rejected;
    });
  });

  describe("Payments", function () {
    it("Should fail if paying an inactive profile", async function () {
      const { swiftLink, owner, user1, user2 } = await deploySwiftLink();
      await swiftLink.write.registerUsername(["bob", ""], { account: user2.account });
      await swiftLink.write.adminDeactivateProfile(["bob", "banned"], { account: owner.account });
      
      const amount = parseEther("1");
      await expect(
        swiftLink.write.payUser(["bob", "0x0000000000000000000000000000000000000000", amount], {
          account: user1.account,
          value: amount,
        })
      ).to.be.rejectedWith("User profile is inactive");
    });
  });
});
