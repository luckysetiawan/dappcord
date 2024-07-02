const { expect } = require("chai")

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

describe("Dappcord", function () {
  let deployer, user;
  let dappcord;

  const NAME = "Dappcord";
  const SYMBOL = "DC";

  beforeEach(async () => {
    // Setup accounts
    [ deployer, user ] = await ethers.getSigners();

    // Deploy Contract
    const DappcordFactory = await ethers.getContractFactory("Dappcord");
    dappcord = await DappcordFactory.deploy(NAME, SYMBOL);

    // Create a channel
    const transaction = await dappcord.connect(deployer).createChannel("general", tokens(1));
    await transaction.wait();
  })

  describe("Deployment", () => {
    it("Sets the name", async () => {
      let result = await dappcord.name();
      expect(result).to.equal(NAME);
    })

    it("Sets the symbol", async () => {
      let result = await dappcord.symbol();
      expect(result).to.equal(SYMBOL);
    })

    it("Sets the owner", async () => {
      let result = await dappcord.owner();
      expect(result).to.equal(deployer.address);
    })
  })

  describe("Creating Channels", () => {
    it("Returns total channels", async () => {
      let result = await dappcord.totalChannels();
      expect(result).to.equal(1);
    })

    it("Returns channel attributes", async () => {
      let channel = await dappcord.getChannel(1);
      expect(channel.id).to.equal(1);
      expect(channel.name).to.equal("general");
      expect(channel.cost).to.equal(tokens(1));
    })
  })

  describe("Joining Channels", () => {
    const ID = 1;
    const AMOUNT = tokens(1);

    beforeEach(async () => {
      const transaction = await dappcord.connect(user).mint(ID, { value: AMOUNT });
      await transaction.wait();
    })

    it("Joins the user", async () => {
      let result = await dappcord.hasJoined(ID, user.address);
      expect(result).to.equal(true);
    })

    it("Increases total supply", async () => {
      let result = await dappcord.totalSupply();
      expect(result).to.equal(ID);
    })

    it("Updates the contract balance", async () => {
      let result = await ethers.provider.getBalance(dappcord.getAddress());
      expect(result).to.equal(AMOUNT);
    })
  })

  describe("Withdrawing", () => {
    const ID = 1;
    const AMOUNT = tokens(1);
    let balanceBefore;

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address);

      let transaction = await dappcord.connect(user).mint(ID, { value: AMOUNT });
      await transaction.wait();

      transaction = await dappcord.connect(deployer).withdraw();
      await transaction.wait();
    })

    it("Updates the owner balance", async () => {
      let balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    })

    it("Updates the contract balance", async () => {
      let balanceAfter = await ethers.provider.getBalance(dappcord.getAddress());
      expect(balanceAfter).to.equal(0);
    })
  })
})
