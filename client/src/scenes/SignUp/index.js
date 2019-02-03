import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';

import { Input, InputLabel, Button, H1, Form } from 'components/base';

import { SIGN_UP_MUTATION } from 'graphql/mutations';

const SignUpHolder = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
`;

export class SignUp extends Component {
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

  onSubmitSuccess = () => {
    console.log('Rejestracja przebiegła pomyślnie');
  };

  onSubmitError = () => {
    console.log('Podczas rejestracji wystąpił błąd');
  };

  render() {
    const { email, password } = this.state;

    return (
      <SignUpHolder>
        <H1>Załóż nowe konto</H1>
        <Mutation
          mutation={SIGN_UP_MUTATION}
          onCompleted={this.onSubmitSuccess}
          onError={this.onSubmitError}
        >
          {signUp => (
            <Form
              onSubmit={e => {
                e.preventDefault();
                signUp({ variables: { email, password } });
              }}
            >
              <InputLabel forHtml="email">email</InputLabel>
              <Input
                name="email"
                type="text"
                placeholder="np. artur.malinowski"
                onChange={this.onEmailChange}
              />
              <InputLabel forHtml="password">hasło</InputLabel>
              <Input
                type="password"
                placeholder="******"
                onChange={this.onPasswordChange}
              />
              <Button type="submit">Załóż konto</Button>
            </Form>
          )}
        </Mutation>
      </SignUpHolder>
    );
  }
}
