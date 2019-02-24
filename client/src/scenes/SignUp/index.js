import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';

import { Layout, Main, ActionButton } from 'components';
import { Input, InputLabel, Section, H1, Form } from 'components/base';

import { SIGN_UP_MUTATION, SET_AUTH_USER_MUTATION } from 'graphql/mutations';

import { client as apolloClient } from 'App';

const SignUpHolder = styled(Section)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 350px;
`;

const Title = styled(H1)`
  margin: 50px 0 100px 0;
  font-size: 2.5em;
  text-align: center;
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

  onSubmitSuccess = async response => {
    const { authUser, token } = response.signUpUser;

    await apolloClient.mutate({
      mutation: SET_AUTH_USER_MUTATION,
      variables: { authUser, token },
    });

    this.props.history.replace('/');
  };

  render() {
    const { email, password } = this.state;

    return (
      <Layout>
        <Main>
          <SignUpHolder>
            <Title>Załóż nowe konto</Title>
            <Mutation
              mutation={SIGN_UP_MUTATION}
              onCompleted={this.onSubmitSuccess}
            >
              {(signUp, { error, loading }) => (
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
                  <ActionButton
                    type="submit"
                    label="Załóż konto"
                    loading={loading}
                    error={error && 'Ups! Coś poszło nie tak'}
                  />
                </Form>
              )}
            </Mutation>
          </SignUpHolder>
        </Main>
      </Layout>
    );
  }
}
