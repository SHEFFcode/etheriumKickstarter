const compiledFactory = require('./build/CampaignFactory.json')
const env = require('./env.js')

const HDWalletProvier = require('truffle-hdwallet-provider')
const Web3 = require('web3')

const provider = new HDWalletProvier(env.mneumonic, env.address)
const web3 = new Web3(provider)

async function deploy() {
  const accounts = await web3.eth.getAccounts()

  console.log(`Attempting to deploy a contract from account ${accounts[0]}`)

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] })

  console.log(`Contract deployed to ${result.options.address}`)
}
deploy()
