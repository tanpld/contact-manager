import React, { Component } from 'react'

import axios from 'axios'

import { Consumer } from '../../context'
import TextInputGroup from '../layout/TextInputGroup'

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )
    const contact = res.data
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = async (dispatch, e) => {
    e.preventDefault()

    // Check for errors
    if (this.state.name === '') {
      this.setState({ errors: { name: 'Name is required' } })
      return
    }
    if (this.state.email === '') {
      this.setState({ errors: { email: 'Email is required' } })
      return
    }
    if (this.state.phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } })
      return
    }

    const updateContact = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    }

    const { id } = this.props.match.params
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updateContact
    )

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data })

    // Clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    })

    this.props.history.push('/')
  }

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card mb-3">
              <div className="card-header">Add contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, value.dispatch)}>
                  <TextInputGroup
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Enter name..."
                    value={this.state.name}
                    onChange={this.onChange}
                    error={this.state.errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter email..."
                    value={this.state.email}
                    onChange={this.onChange}
                    error={this.state.errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    type="text"
                    name="phone"
                    placeholder="Enter phone..."
                    value={this.state.phone}
                    onChange={this.onChange}
                    error={this.state.errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-block btn-info"
                  />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default EditContact
