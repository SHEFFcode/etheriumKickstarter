const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../etherium/build/CampaignFactory.json')
const compiledCampaign = require('../etherium/build/Campaign.json')

let accounts, factory, campaignAddress, campaign

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  })

  const [campaignAddress] = await factory.methods.getDeployedCampaigns().call()

  //Already deployed a contract, so we give the already deployed contract address
  //Also no need to deploy or send
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  )
})

describe('Campaigns', () => {
  it('deploys a factory and a capaign', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })
})
