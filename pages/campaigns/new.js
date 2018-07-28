import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Button, Form, Input } from 'semantic-ui-react'

class CampaignNew extends Component {
  state = {
    minimumContribution: ''
  }

  render() {
    return (
      <Layout>
        <h3>Create a campaign</h3>
        <Form>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label={'wei'}
              labelPosition={'right'}
              value={this.state.minimumContribution}
              onChange={e =>
                this.setState({ minimumContribution: e.target.value })
              }
            />
          </Form.Field>
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew
