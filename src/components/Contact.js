import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contact extends Component {
  state = {};
  render() {
    return (
      <div className="card card-body mb-3">
        <h4>{this.props.name}</h4>
        <ul className="list-group">
          <li className="list-group-item">{this.props.email}</li>
          <li className="list-group-item">{this.props.phone}</li>
        </ul>
      </div>
    );
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default Contact;
