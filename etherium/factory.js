import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x15c2eBED287Dd54762E255fF7cd2e11021bcBF6b'
)

export default instance
