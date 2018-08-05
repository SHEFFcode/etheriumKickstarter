import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'

class RequestIndexPage extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    return { address }
  }
  render() {
    const { address } = this.props
    return (
      <Layout route={`/campaigns/${address}/requests/new`}>
        <h3>Request list</h3>
        <Link>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
      </Layout>
    )
  }
}

export default RequestIndexPage
