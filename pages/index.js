import React, { Component } from 'react'
import factory from '../etherium/factory'

class CampaignIndex extends Component {
  // Because of server side rendering we do not get componentDidMount
  // We have to use getInitialProps used by next.js
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns }
  }

  render() {
    return <div>{this.props.campaigns[0]}</div>
  }
}

export default CampaignIndex
