import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import factory from '../etherium/factory'

class CampaignIndex extends Component {
  // Because of server side rendering we do not get componentDidMount
  // We have to use getInitialProps used by next.js
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns }
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      }
    })

    return <Card.Group items={items} />
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        />
        <div>{this.renderCampaigns()}</div>
      </div>
    )
  }
}

export default CampaignIndex
