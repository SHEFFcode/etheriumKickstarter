import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from '../etherium/Campaign'
import web3 from '../etherium/web3'
import { Router } from '../routes'

class ContributeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(e) {
    e.preventDefault()
    const campaign = Campaign(this.props.address)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      })
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label={'ether'}
            labelPosition={'right'}
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </Form.Field>
        <Button primary>Contribute</Button>
      </Form>
    )
  }
}

export default ContributeForm
