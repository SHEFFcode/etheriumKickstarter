import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x75cA3933b89490C26b580397A38f8A70D5bd693B'
)

export default instance
