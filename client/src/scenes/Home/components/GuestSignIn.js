import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styles';

import { Input, InputLabel, Button, Form } from 'components/base';

import { client as apolloClient } from 'App';

import {
  GUEST_SIGN_IN_MUTATION,
  SET_AUTH_USER_MUTATION,
} from 'graphql/mutations';

const LoginButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 10px;
`;

export class GuestSignIn extends Component {
  loginInput = null;

  constructor(props) {
    super(props);
    this.state = {
      weddingId: '',
      code: '',
      errorMessage: '',
    };
  }

  componentDidMount() {
    console.log('loginInput: ', this.loginInput);
    if (this.loginInput) {
      this.loginInput.focus();
    }
  }

  onLoginChange = e => {
    this.setState({ weddingId: e.target.value });
  };

  onCodeChange = e => {
    this.setState({ code: e.target.value });
  };

  onSubmitSuccess = async response => {
    console.log('Logowanie gościa przebiegło pomyślnie');
    const { authUser, token } = response.signInGuest;

    await apolloClient.mutate({
      mutation: SET_AUTH_USER_MUTATION,
      variables: { authUser, token },
    });

    this.props.history.replace(`/guest/${authUser.id}`);
  };

  onSubmitError = () => {
    console.log('Podczas logowania wystąpił błąd');
  };

  render() {
    const { weddingId, code } = this.state;

    return (
      <Mutation
        mutation={GUEST_SIGN_IN_MUTATION}
        onCompleted={this.onSubmitSuccess}
        onError={this.onSubmitError}
      >
        {guestSignIn => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              guestSignIn({ variables: { weddingId, code } });
            }}
          >
            <InputLabel forHtml="weddingId">login</InputLabel>
            <Input
              name="weddingId"
              type="text"
              placeholder="np. wesele0125"
              onChange={this.onLoginChange}
              ref={el => (this.loginInput = el)}
            />
            <InputLabel forHtml="code">kod</InputLabel>
            <Input
              type="code"
              placeholder="np. FC83CK"
              onChange={this.onCodeChange}
            />
            <LoginButton type="submit">Wchodzę!</LoginButton>
          </Form>
        )}
      </Mutation>
    );
  }
}
