const {ethers} = require('hardhat');
const {assert} = require('chai');

describe("Main contract test 1", function () {
    let deployer, projectOwner, user1, user2, user3;
    let MainContract, mainContract, CCIPContract, ccipContract;

    before(async function () {
        [deployer, projectOwner, user1, user2, user3] = await ethers.getSigners();
        CCIPContract = await ethers.getContractFactory("ERC20Token");
        ccipContract = await CCIPContract.connect(deployer).deploy("CCIP-BnM", "CCIPT");
        MainContract = await ethers.getContractFactory("Main");
        ccipAddress = await ccipContract.getAddress();
        mainContract = await MainContract.connect(deployer).deploy(ccipAddress);
    });

    it("Create a new project", async function () {
        await mainContract.connect(projectOwner).deployNewProject("Example project name", 123456, 15, 5, "TEST");
        const projectInfo = await mainContract.connect(user1).getProject(0);
        console.log(projectInfo);
        assert.equal(("Example project name", 123456, 15, 5, "TEST"), projectInfo);
    });
});