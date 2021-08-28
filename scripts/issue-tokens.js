const TokenFarm = artifacts.require("TokenFarm")

// comand to create file ==> mkdir scripts/ touch scripts/issue-tokens.js

//truffle exec scripts/issue-tokens.js
module.exports = async function(callback) {
    let tokenFarm = await TokenFarm.deployed()
    await tokenFarm.issueToken()
    console.log('token issued')
    callback()
};

