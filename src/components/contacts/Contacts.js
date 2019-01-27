import React, { Component } from 'react';

import { Consumer } from '../../context';
import Contact from './Contact';

class Contacts extends Component {
  handleDelete = id => {
    console.log(id);
    const contacts = this.state.contacts.filter(c => c.id !== id);
    this.setState({ contacts });
  };
  render() {
    return (
      <Consumer>
        {value => {
          return (
            <React.Fragment>
              <h1 className="display-4">
                <span className="text-info">Contact</span> List
              </h1>
              {value.contacts.map(c => (
                <Contact
                  key={c.id}
                  contact={c}
                  onDeleteClick={this.handleDelete.bind(this, c.id)}
                />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
