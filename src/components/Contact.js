import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Consumer } from '../context';

class Contact extends Component {
  state = {
    showContact: false
  };

  onShowClick = () => {
    this.setState({ showContact: !this.state.showContact });
  };

  onDeleteClick = (id, dispatch) => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

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
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
