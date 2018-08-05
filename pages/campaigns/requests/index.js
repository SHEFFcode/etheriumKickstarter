import React, { Component } from 'react'
import { Button, Table, Tab } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'
import Campaign from '../../../etherium/Campaign'
import RequestRow from '../../../components/RequestRow'

class RequestIndexPage extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()
    console.log(requestCount)
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((el, index) => {
          return campaign.methods.requests(index).call()
        })
    )
    return { address, requests, requestCount }
  }

  renderRows() {
    return (
      this.props.requests &&
      this.props.requests.length &&
      this.props.requests.map((request, index) => {
        return (
          <RequestRow
            key={index}
            request={request}
            address={this.props.address}
          />
        )
      })
    )
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table
    const { address } = this.props
    return (
      <Layout>
        <h3>Request list</h3>
        <Link route={`/campaigns/${address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
      </Layout>
    )
  }
}

export default RequestIndexPage
