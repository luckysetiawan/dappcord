const hre = require("hardhat")

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [ deployer ] = await ethers.getSigners();
  const NAME = "Dappcord";
  const SYMBOL = "DC";

  // Deploy Contract
  const DappcordFactory = await ethers.getContractFactory("Dappcord");
  dappcord = await DappcordFactory.deploy(NAME, SYMBOL);
  await dappcord.waitForDeployment();

  console.log(`Deployed Dappcord Contract at: ${await dappcord.getAddress()}`);

  // Create 3 Channels
  const CHANNEL_NAMES = ["general", "intro", "jobs"];
  const COSTS = [tokens(0.25), tokens(0), tokens(0.1)];

  for (let i = 0; i < 3; i++) {
    const transaction = await dappcord.connect(deployer).createChannel(CHANNEL_NAMES[i], COSTS[i]);
    await transaction.wait();

    console.log(`Created text channel #${CHANNEL_NAMES[i]}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
