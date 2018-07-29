import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../etherium/Campaign'
import { Card } from 'semantic-ui-react'
import web3 from '../../etherium/web3'

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
      },
      {
        header: minimumContribution,
        meta: 'Minimum contribution (wei)',
        description: 'You must contribute this much wei to become an approver'
      },
      {
        header: requestCount,
        meta: 'Number of requests',
        description:
          'A request tries to withdraw money from the contract.  Requests must be approved by approvers'
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description:
          'Number of people who have already contributed to this campaign.'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much this campaign has left to spend.'
      }
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
