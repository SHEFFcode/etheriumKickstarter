import React, { Component } from 'react'
import { Form, Button, Label, Input } from 'semantic-ui-react'
import Campaign from '../../../etherium/Campaign'
import web3 from '../../../etherium/web3'
import { Link, Router } from '../../../routes'
import Layout from '../../../components/Layout'

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recepient: '',
    loading: false,
    errorMessage: ''
  }
  static async getInitialProps(props) {
    const { address } = props.query
    return { address }
  }

  onSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, errorMessage: '' })
    const campaign = Campaign(this.props.address)
    const { description, value, recepient } = this.state
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recepient)
        .send({ from: accounts[0] })
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }
  render() {
    const { description, recepient, value } = this.state
    return (
      <Layout>
        <h3>Create an approval request</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <Label>Description</Label>
            <Input
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <Label>Value (ether)</Label>
            <Input
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <Label>Recepient</Label>
            <Input
              value={recepient}
              onChange={e => this.setState({ recepient: e.target.recepient })}
            />
          </Form.Field>
          <Button primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default RequestNew
