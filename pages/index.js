import React, { Component } from 'react'
import factory from '../etherium/factory'

class CampaignIndex extends Component {
  componentDidMount = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    console.log(campaigns)
  }

  render() {
    return <div>Campaigns Index</div>
  }
}

export default CampaignIndex
