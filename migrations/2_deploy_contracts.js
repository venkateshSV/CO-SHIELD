const ConsumerData = artifacts.require("ConsumerData");

module.exports = function(deployer) {
  deployer.deploy(ConsumerData);
};
