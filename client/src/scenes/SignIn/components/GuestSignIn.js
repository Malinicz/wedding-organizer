import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { Input, InputLabel, Button, Form } from 'components/base';

import { client as apolloClient } from 'App';

import {
  GUEST_SIGN_IN_MUTATION,
  SET_AUTH_USER_MUTATION,
} from 'graphql/mutations';

export class GuestSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weddingId: '',
      code: '',
      errorMessage: '',
    };
  }

  onLoginChange = e => {
    this.setState({ weddingId: e.target.value });
  };

  onCodeChange = e => {
    this.setState({ code: e.target.value });
  };

  onSubmitSuccess = async response => {
    console.log('Logowanie gościa przebiegło pomyślnie');
    const { authUser } = response.signInGuest;

    await apolloClient.mutate({
      mutation: SET_AUTH_USER_MUTATION,
      variables: { authUser },
    });

    this.props.history.replace('/guest');
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
              placeholder="np. nowakowie"
              onChange={this.onLoginChange}
            />
            <InputLabel forHtml="code">kod</InputLabel>
            <Input
              type="code"
              placeholder="******"
              onChange={this.onCodeChange}
            />
            <Button type="submit">Zaloguj</Button>
          </Form>
        )}
      </Mutation>
    );
  }
}
