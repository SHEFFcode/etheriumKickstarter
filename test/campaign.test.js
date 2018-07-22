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

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call()
    assert.equal(accounts[0], manager)
  })

  it('allows people to contribute money and marks them as approver', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1] //ganache will create 10 accounts
    })

    const isContributor = await campaign.methods.approvers(accounts[1]).call()
    assert(isContributor) // will fail if isContributor is falsy
  })

  it('should have a minimum contributor', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '1',
        from: accounts[1]
      })
      assert(false)
    } catch (error) {
      assert(error)
    }
  })

  it('allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({ from: accounts[0], gas: '1000000' })

    const request = await campaign.methods.requests(0).call()

    assert.equal('Buy batteries', request.description)
  })
})
