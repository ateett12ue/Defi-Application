const _initial_migration = require("./1_initial_migration");

const DappToken = artifacts.require("DappToken")
const DaiToken = artifacts.require("DaiToken")
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
    // deploy dai token for address
    await deployer.deploy(DaiToken);
    const daiToken = await DaiToken.deployed()

    // deploy Dapp token for address
    await deployer.deploy(DappToken);
    const dappToken = await DappToken.deployed()

    // deploy Token Farm
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
    const tokenFarm = await TokenFarm.deployed()

    // transfer all dapp token to tokenfarm for yield interest
    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

    //transfering some dai to 3rd party account (invester) as after deployment it all will be ours if not transfered
    await daiToken.transfer(accounts[1],'1000000000000000000000')
};

