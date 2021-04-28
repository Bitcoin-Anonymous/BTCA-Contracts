/* global artifacts */
const BNBBtca = artifacts.require('BNBBtca')
const Verifier = artifacts.require('Verifier')
const hasherContract = artifacts.require('Hasher')


module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const verifier = await Verifier.deployed()
    const hasherInstance = await hasherContract.deployed()
    await BNBBtca.link(hasherContract, hasherInstance.address)
    const btca = await deployer.deploy(BNBBtca, verifier.address, '1000000000000000000', 20, accounts[0])
    console.log('BNB1 Btca\'s address ', btca.address)
  })
}
