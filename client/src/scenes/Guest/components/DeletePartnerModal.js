import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Modal, ActionButton } from 'components';

import { DELETE_PARTNER_MUTATION } from 'graphql/mutations';

export class DeletePartnerModal extends Component {
  render() {
    const { guest, handleDeletePartnerSuccess, handleClose } = this.props;

    return (
      <Modal handleClose={handleClose}>
        <Modal.Title>Czy na pewno chcesz usunąć tę osobę?</Modal.Title>
        <Modal.Content>
          <Mutation
            mutation={DELETE_PARTNER_MUTATION}
            variables={{ partnerId: guest.id }}
            onCompleted={() =>
              handleDeletePartnerSuccess(guest.id, guest.partner.id)
            }
          >
            {(deletePartner, { loading, error }) => (
              <ActionButton
                onClick={deletePartner}
                label="usuń"
                loading={loading}
                error={error && 'Ups! Coś poszło nie tak - spróbuj ponownie'}
              />
            )}
          </Mutation>
        </Modal.Content>
      </Modal>
    );
  }
}
