import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { Consumer } from '../../context'

class Contact extends Component {
  state = {
    showContact: false
  }

  onShowClick = () => {
    this.setState({ showContact: !this.state.showContact })
  }

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    dispatch({ type: 'DELETE_CONTACT', payload: id })
  }

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card card-body mb-3">
              <h4>
                {this.props.contact.name}{' '}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-chevron-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(
                    this,
                    this.props.contact.id,
                    value.dispatch
                  )}
                />
                <Link to={`contact/edit/${this.props.contact.id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {this.state.showContact ? (
                <ul className="list-group">
                  <li className="list-group-item">
                    {this.props.contact.email}
                  </li>
                  <li className="list-group-item">
                    {this.props.contact.phone}
                  </li>
                </ul>
              ) : null}
            </div>
          )
        }}
      </Consumer>
    )
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
}

export default Contact
