import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Input, InputLabel, Button } from 'components/base';

const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($login: String!, $password: String!) {
    authenticate(login: $login, password: $password) {
      success
    }
  }
`;

const LoginFormHolder = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;
`;

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      errorMessage: '',
    };
  }

  onLoginChange = e => {
    this.setState({ login: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onSubmit = authenticateFn => async () => {
    const { login, password } = this.state;
    try {
      const response = await authenticateFn({ variables: { login, password } });
      const {
        data: {
          authenticate: { success },
        },
      } = response;

      if (success) {
        this.props.setIsLogged(true);
        this.setState({ errorMessage: '' });
      } else {
        this.setState({ errorMessage: 'Login lub hasło są nieprawidłowe' });
      }
    } catch (error) {
      this.setState({
        errorMessage: 'Wystąpił nieoczekiwany błąd, spróbuj ponownie później',
      });
    }
  };

  render() {
    return (
      <LoginFormHolder>
        <InputLabel forHtml="login">login</InputLabel>
        <Input
          name="login"
          type="text"
          placeholder="np. artur.malinowski"
          onChange={this.onLoginChange}
        />
        <InputLabel forHtml="password">hasło</InputLabel>
        <Input
          type="password"
          placeholder="******"
          onChange={this.onPasswordChange}
        />
        <Mutation mutation={AUTHENTICATE_MUTATION}>
          {(authenticate, { data, loading, error }) => {
            return (
              <Button onClick={this.onSubmit(authenticate)}>Zaloguj</Button>
            );
          }}
        </Mutation>
        <div>isLogged: {`${this.props.isLogged}`}</div>
        <div>errorMessage: {this.state.errorMessage}</div>
      </LoginFormHolder>
    );
  }
}
