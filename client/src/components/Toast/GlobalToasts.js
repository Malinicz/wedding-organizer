import React, { Component } from 'react';
import { ToastContext } from './ToastProvider';

import { SingleToast } from './SingleToast';

export class GlobalToasts extends Component {
  render() {
    const {
      state: { messages },
      actions: { removeMessage },
    } = this.context;

    return (
      <div>
        {messages.map((message, index) => (
          <SingleToast
            key={message.id}
            message={message}
            handleClose={() => removeMessage(message.id)}
            index={index}
          />
        ))}
      </div>
    );
  }
}

GlobalToasts.contextType = ToastContext;
