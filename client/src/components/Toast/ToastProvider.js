import React, { createContext, Component } from 'react';
import uuid from 'uuid/v4';

export const ToastContext = createContext();

export class ToastProvider extends Component {
  state = {
    messages: [],
  };

  addMessage = text => {
    this.setState(prevState => ({
      messages: [...prevState.messages, { id: uuid(), text }],
    }));
  };

  removeMessage = messageId => {
    this.setState(prevState => ({
      messages: [
        ...prevState.messages.filter(message => message.id !== messageId),
      ],
    }));
  };

  render() {
    return (
      <ToastContext.Provider
        value={{
          state: this.state,
          actions: {
            showMessage: this.addMessage,
            removeMessage: this.removeMessage,
          },
        }}
      >
        {this.props.children}
      </ToastContext.Provider>
    );
  }
}
