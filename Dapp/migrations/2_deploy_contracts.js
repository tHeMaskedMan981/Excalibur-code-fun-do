// var ConvertLib = artifacts.require("./ConvertLib.sol");
var Election = artifacts.require("./Election.sol");

module.exports = function(deployer) {
//   deployer.deploy(ConvertLib);
//   deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(Election);
};
