import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../etherium/factory'
import web3 from '../../etherium/web3'
import { Router } from '../../routes'

class CampaignNew extends Component {
  constructor() {
    super()
    this.state = {
      minimumContribution: '',
      errorMessage: '',
      loading: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(e) {
    e.preventDefault()
    this.setState({ loading: true })
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] })
      Router.pushRoute('/')
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <h3>Create a campaign</h3>
        <Form onSubmit={this.onSubmit} error={Boolean(this.state.errorMessage)}>
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
          <Message
            error
            header={'Oops, something went wrong'}
            content={this.state.errorMessage}
          />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew
