const TokenFarm = artifacts.require("TokenFarm")

module.exports = async function(callback) {
    console.log('token issued')
    callback()
};

