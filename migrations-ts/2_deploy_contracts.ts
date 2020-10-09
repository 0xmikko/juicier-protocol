
const Pool= artifacts.require('Pool')

module.exports = function(deployer) {
  deployer.deploy(Pool)
} as Truffle.Migration

// because of https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {}