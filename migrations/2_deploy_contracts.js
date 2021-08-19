const _initial_migration = require("./1_initial_migration");

const TokenFarm = artifacts.require("TokenFarm");

module.exports = function(deployer) {
  deployer.deploy(TokenFarm);
};

