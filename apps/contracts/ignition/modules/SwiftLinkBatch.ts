import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SwiftLinkBatchModule", (m) => {
  // We need to provide the existing SwiftLink address
  // On Celo Alfajores, it's 0xE95C3C6052484C64978D6281bEb62f05d352ed43
  const registryAddress = m.getParameter("registryAddress", "0xE95C3C6052484C64978D6281bEb62f05d352ed43");

  const swiftLinkBatch = m.contract("SwiftLinkBatch", [registryAddress]);

  return { swiftLinkBatch };
});
