import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import { ActionButton, Checkbox } from 'components';
import { Form, InputLabel, Input, SectionSubtitle } from 'components/base';

import { ADD_GUESTS } from 'graphql/mutations';
import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import { getErrorMessage } from 'utils/helpers';

import { RETRY_MESSAGE } from 'constants/errorMessages';

const AddSingleGuestHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const initialState = {
  guestGroup: {
    customGreeting: '',
    allowAccomodation: false,
  },
  guest: {
    firstName: '',
    lastName: '',
    allowPartner: true,
  },
};

export class AddSingleGuest extends Component {
  state = initialState;

  onFirstNameChange = firstName => {
    this.setState(prevState => ({ guest: { ...prevState.guest, firstName } }));
  };

  onLastNameChange = lastName => {
    this.setState(prevState => ({ guest: { ...prevState.guest, lastName } }));
  };

  toggleAllowPartner = () => {
    this.setState(prevState => ({
      guest: {
        ...prevState.guest,
        allowPartner: !prevState.guest.allowPartner,
      },
    }));
  };

  toggleAllowAccomodation = () => {
    this.setState(prevState => ({
      guestGroup: {
        ...prevState.guestGroup,
        allowAccomodation: !prevState.guestGroup.allowAccomodation,
      },
    }));
  };

  onGuestGroupCustomGreetingChange = customGreeting => {
    this.setState(prevState => ({
      guestGroup: { ...prevState.guestGroup, customGreeting },
    }));
  };

  render() {
    const { weddingId } = this.props;
    const { guest, guestGroup } = this.state;

    return (
      <Mutation
        mutation={ADD_GUESTS}
        onCompleted={() => {
          this.setState(initialState);
          window.scrollTo(0, 0);
        }}
        refetchQueries={[
          { query: GET_WEDDING_INITIAL_DATA, variables: { id: weddingId } },
        ]}
        variables={{
          weddingId: weddingId,
          code: guestGroup.code,
          customGreeting: guestGroup.customGreeting,
          allowAccomodation: guestGroup.allowAccomodation,
          guests: [
            {
              firstName: guest.firstName,
              lastName: guest.lastName,
              allowPartner: guest.allowPartner,
            },
          ],
        }}
      >
        {(addNewGuest, { loading, error }) => {
          return (
            <AddSingleGuestHolder>
              <SectionSubtitle>Pojedynczy gość</SectionSubtitle>
              <Form onSubmit={addNewGuest}>
                <InputLabel forHtml="firstName">imię</InputLabel>
                <Input
                  name="firstName"
                  value={guest.firstName}
                  type="text"
                  placeholder="Jan"
                  onChange={e => this.onFirstNameChange(e.target.value)}
                  dense
                />
                <InputLabel forHtml="lastName">nazwisko</InputLabel>
                <Input
                  name="lastName"
                  value={guest.lastName}
                  type="text"
                  placeholder="Nowak"
                  onChange={e => this.onLastNameChange(e.target.value)}
                />
                <Checkbox
                  value="allowPartner"
                  label={
                    <span>
                      Pozwól na dodanie <strong>Osoby Towarzyszącej</strong>
                    </span>
                  }
                  checked={guest.allowPartner}
                  onChange={this.toggleAllowPartner}
                />
                <Checkbox
                  value="allowAccomodation"
                  label={
                    <span>
                      Pozwól na dodanie opcji <strong>noclegu</strong>
                    </span>
                  }
                  checked={guestGroup.allowAccomodation}
                  onChange={this.toggleAllowAccomodation}
                />
                <br />
                <br />
                <InputLabel forHtml="customGreeting">
                  personalizowane przywitanie
                </InputLabel>
                <Input
                  name="customGreeting"
                  value={guestGroup.customGreeting}
                  type="text"
                  placeholder="Elo, Ziomeczku!"
                  onChange={e =>
                    this.onGuestGroupCustomGreetingChange(e.target.value)
                  }
                  dense
                />

                <ActionButton
                  type="button"
                  onClick={addNewGuest}
                  label="Dodaj gościa"
                  loading={loading}
                  error={error && (getErrorMessage(error) || RETRY_MESSAGE)}
                />
              </Form>
            </AddSingleGuestHolder>
          );
        }}
      </Mutation>
    );
  }
}
