import React, { Component } from 'react';
import styled from 'styled-components';

const GuestFormHolder = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;
`;

export class GuestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLoginChange = e => {
    // code here
  };

  onPasswordChange = e => {
    // code here
  };

  onSubmit = () => {
    // code here
  };

  render() {
    return <GuestFormHolder>Guest form</GuestFormHolder>;
  }
}
