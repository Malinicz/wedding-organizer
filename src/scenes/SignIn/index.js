import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';

import { Input, InputLabel, Button, H1, Form } from 'components/base';

import { client as apolloClient } from 'App';

import { SET_AUTH_USER_MUTATION, SIGN_IN_MUTATION } from 'graphql/mutations';

const SignInHolder = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
`;

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onSubmitSuccess = async response => {
    console.log('Logowanie przebiegło pomyślnie');
    const { authUser } = response.signInUser;

    await apolloClient.mutate({
      mutation: SET_AUTH_USER_MUTATION,
      variables: { authUser },
    });

    this.props.history.replace('/');
  };

  onSubmitError = () => {
    console.log('Podczas logowania wystąpił błąd');
  };

  render() {
    const { email, password } = this.state;

    return (
      <SignInHolder>
        <H1>Zaloguj się</H1>
        <Mutation
          mutation={SIGN_IN_MUTATION}
          onCompleted={this.onSubmitSuccess}
          onError={this.onSubmitError}
        >
          {signIn => (
            <Form
              onSubmit={e => {
                e.preventDefault();
                signIn({ variables: { email, password } });
              }}
            >
              <InputLabel forHtml="email">email</InputLabel>
              <Input
                name="email"
                type="text"
                placeholder="john.doe@example.com"
                onChange={this.onEmailChange}
              />
              <InputLabel forHtml="password">hasło</InputLabel>
              <Input
                type="password"
                placeholder="******"
                onChange={this.onPasswordChange}
              />
              <Button type="submit">Zaloguj</Button>
            </Form>
          )}
        </Mutation>
      </SignInHolder>
    );
  }
}
