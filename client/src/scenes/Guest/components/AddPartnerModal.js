import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Modal, ActionButton } from 'components';
import { InputLabel, Input, Form } from 'components/base';

import { ADD_PARTNER_MUTATION } from 'graphql/mutations';

export class AddPartnerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
    };
  }

  onFirstNameChange = firstName => {
    this.setState({ firstName });
  };

  onLastNameChange = lastName => {
    this.setState({ lastName });
  };

  render() {
    const { firstName, lastName } = this.state;
    const {
      guestId,
      guestGroupId,
      handleAddPartnerSuccess,
      handleClose,
    } = this.props;

    return (
      <Modal handleClose={handleClose}>
        <Modal.Title>Dodaj osobę towarzyszącą</Modal.Title>
        <Modal.Content>
          <Mutation
            mutation={ADD_PARTNER_MUTATION}
            onCompleted={response =>
              handleAddPartnerSuccess(guestId, response.addPartner.partner)
            }
          >
            {(addPartner, { loading, error }) => (
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  addPartner({
                    variables: {
                      guestGroupId,
                      guestId,
                      firstName: firstName || undefined,
                      lastName: lastName || undefined,
                    },
                  });
                }}
              >
                <InputLabel forHtml="firstName">imię</InputLabel>
                <Input
                  name="firstName"
                  type="text"
                  placeholder="Jan"
                  onChange={e => this.onFirstNameChange(e.target.value)}
                />
                <InputLabel forHtml="lastName">nazwisko</InputLabel>
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Nowak"
                  onChange={e => this.onLastNameChange(e.target.value)}
                />
                <ActionButton
                  type="submit"
                  label="dodaj"
                  loading={loading}
                  error={error && 'Ups! Coś poszło nie tak - spróbuj ponownie'}
                />
              </Form>
            )}
          </Mutation>
        </Modal.Content>
      </Modal>
    );
  }
}
