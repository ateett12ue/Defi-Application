const TokenFarm = artifacts.require("TokenFarm")

// command to create file ==> mkdir scripts/ touch scripts/issue-tokens.js
// command to apply new contracts on blockchain ==> truffle migrate --reset

//truffle exec scripts/issue-tokens.js
module.exports = async function(callback) {
    let tokenFarm = await TokenFarm.deployed()
    await tokenFarm.issueToken()
    console.log('token issued')
    callback()
};

