import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from '../etherium/Campaign'
import web3 from '../etherium/web3'
import { Router } from '../routes'

class ContributeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      errorMessage: '',
      loading: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(e) {
    e.preventDefault()
    this.setState({ loading: true, errorMessage: '' })
    const campaign = Campaign(this.props.address)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      })
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }
    this.setState({ loading: false, value: '' })
  }
  render() {
    const { loading, errorMessage } = this.state
    return (
      <Form onSubmit={this.onSubmit} error={Boolean(errorMessage)}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label={'ether'}
            labelPosition={'right'}
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </Form.Field>
        <Message error header={'Ooops'} content={errorMessage} />
        <Button loading={loading} primary>
          Contribute
        </Button>
      </Form>
    )
  }
}

export default ContributeForm
