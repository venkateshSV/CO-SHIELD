const ConsumerData = artifacts.require("ConsumerData");
const DistributorData = artifacts.require("DistributorData");
const VaccineData = artifacts.require("VaccineData");

module.exports = function(deployer) {
  deployer.deploy(ConsumerData);
  deployer.deploy(DistributorData);
  deployer.deploy(VaccineData);
};