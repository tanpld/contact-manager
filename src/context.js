import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      {
        id: '1',
        name: 'John Doe',
        email: 'jdoe@email.com',
        phone: '555-555-5555'
      },
      {
        id: '2',
        name: 'Alex Days',
        email: 'adays@email.com',
        phone: '333-333-3333'
      },
      {
        id: '3',
        name: 'Kim Soo',
        email: 'ksoo@email.com',
        phone: '999-999-9999'
      }
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
