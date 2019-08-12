var HelloBlockchain = artifacts.require("./HelloBlockchain.sol");

module.exports = function(deployer) {
  deployer.deploy(HelloBlockchain,"this is a secret message");
};
