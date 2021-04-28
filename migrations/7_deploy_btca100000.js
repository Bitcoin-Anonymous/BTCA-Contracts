/* global artifacts */
const BEP20Btca = artifacts.require('BEP20Btca')
const Verifier = artifacts.require('Verifier')
const hasherContract = artifacts.require('Hasher')


module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const verifier = await Verifier.deployed()
    const hasherInstance = await hasherContract.deployed()
    await BEP20Btca.link(hasherContract, hasherInstance.address)
    const btca = await deployer.deploy(BEP20Btca, verifier.address, '100000000000000000000000', 20, accounts[0], '0xd54fd5d0c349c06373f3fe914151d1555b629fb6')
    console.log('BTCA100000 Btca\'s address ', btca.address)
  })
}
