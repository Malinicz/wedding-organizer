import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { ActionButton } from 'components';
import { Input, InputLabel, Form } from 'components/base';

import { client as apolloClient } from 'App';

import {
  GUEST_SIGN_IN_MUTATION,
  SET_AUTH_USER_MUTATION,
} from 'graphql/mutations';

import { GUEST } from 'constants/routes';
import { RETRY_MESSAGE } from 'constants/errorMessages';

import { getErrorMessage } from 'utils/helpers';

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
    if (this.loginInput) {
      this.loginInput.focus();
    }
  }

  onLoginChange = e => {
    this.setState({ weddingId: e.target.value });
  };

  onLoginBlur = () => {
    const { weddingId } = this.state;
    const { weddings, handleWeddingNameChange } = this.props;
    const wedding =
      weddings && weddings.find(wedding => wedding.internalId === weddingId);

    handleWeddingNameChange(wedding ? wedding.name : '');
  };

  onCodeChange = e => {
    this.setState({ code: e.target.value });
  };

  onSubmitSuccess = async response => {
    const { authUser, token } = response.signInGuest;

    await apolloClient.mutate({
      mutation: SET_AUTH_USER_MUTATION,
      variables: { authUser, token },
    });

    this.props.history.replace(`${GUEST}/${authUser.id}`);
  };

  render() {
    const { weddingId, code } = this.state;

    return (
      <Mutation
        mutation={GUEST_SIGN_IN_MUTATION}
        onCompleted={this.onSubmitSuccess}
      >
        {(guestSignIn, { loading, error }) => {
          return (
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
                onBlur={this.onLoginBlur}
              />
              <InputLabel forHtml="code">kod</InputLabel>
              <Input
                type="code"
                placeholder="np. FC42C"
                onChange={this.onCodeChange}
              />
              <ActionButton
                type="submit"
                label="Wchodzę!"
                loading={loading}
                error={error && (getErrorMessage(error) || RETRY_MESSAGE)}
              />
            </Form>
          );
        }}
      </Mutation>
    );
  }
}
