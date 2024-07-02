const { expect } = require("chai")

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

describe("Dappcord", function () {
  let deployer, user;
  let dappcord;

  const NAME = "Dappcord";
  const SYMBOL = "DC";

  describe("Deployment", () => {
    beforeEach(async () => {
      // Setup accounts
      [ deployer, user ] = await ethers.getSigners();

      // Deploy Contract
      const DappcordFactory = await ethers.getContractFactory("Dappcord");
      dappcord = await DappcordFactory.deploy(NAME, SYMBOL);
    })

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
})
