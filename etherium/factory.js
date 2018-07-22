import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6dA8b62617548A1be897576121E01B2e07BA5292'
)

export default instance
