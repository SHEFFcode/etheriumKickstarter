import React, { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Campaign from '../../../etherium/Campaign'
import web3 from '../../../etherium/web3'
import { Link, Router } from '../../../routes'

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recepient: ''
  }
  static async getInitialProps(props) {
    const { address } = props.query
    return { address }
  }
  render() {
    const { description, recepient, value } = this.state
    return (
      <Form>
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
            onChange={e => this.setState({ value: e.target.recepient })}
          />
        </Form.Field>
      </Form>
    )
  }
}

export default RequestNew
