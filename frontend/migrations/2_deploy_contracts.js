const FBXNFT = artifacts.require("FBXNFT");

module.exports = function (deployer) {
  deployer.deploy(FBXNFT);
};