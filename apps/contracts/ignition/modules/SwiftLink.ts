import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SwiftLinkModule = buildModule("SwiftLinkModule", (m) => {
  const swiftlink = m.contract("SwiftLink");

  return { swiftlink };
});

export default SwiftLinkModule;
