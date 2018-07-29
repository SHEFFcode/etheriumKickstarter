import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../etherium/Campaign'
import { Card } from 'semantic-ui-react'

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    const campaign = Campaign(address)
    const summary = await campaign.methods.getSummary().call()
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount
    } = this.props
    const items = [
      {
        header: manager,
        meta: 'address of manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      }
      // {
      //   header: ,
      //   meta: ,
      //   description: ,
      // },
      // {
      //   header: ,
      //   meta: ,
      //   description: ,
      // },
    ]
    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        {this.renderCards()}
      </Layout>
    )
  }
}

export default CampaignShow
