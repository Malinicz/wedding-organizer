import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { ActionButton } from 'components';
import { Input, InputLabel, Form } from 'components/base';

import { SIGN_IN_MUTATION } from 'graphql/mutations';
import { ORGANISER_WEDDING } from 'constants/routes';

export class AdminSignIn extends Component {
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
    const { authUser, token } = response.signInUser;

    window.localStorage.setItem('token', token);

    // TODO redirect to /wesele
    const weddingId =
      authUser &&
      authUser.weddings &&
      authUser.weddings[0] &&
      authUser.weddings[0].id;

    this.props.history.replace(`${ORGANISER_WEDDING}/${weddingId}`);
  };

  render() {
    const { email, password } = this.state;

    return (
      <Mutation mutation={SIGN_IN_MUTATION} onCompleted={this.onSubmitSuccess}>
        {(signIn, { loading, error }) => (
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
            <ActionButton
              type="submit"
              label="Wchodzę!"
              loading={loading}
              error={error && 'Ups! Błędny login lub hasło'}
            />
          </Form>
        )}
      </Mutation>
    );
  }
}

export default AdminSignIn;
