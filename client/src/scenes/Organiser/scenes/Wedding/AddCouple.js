import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import { ActionButton, Checkbox, Tooltip } from 'components';
import { Form, InputLabel, Input, H3, MutedText } from 'components/base';

import { ADD_GUESTS } from 'graphql/mutations';
import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import { femaleOrdinalNumbers } from 'constants/ordinalNumbers';

import { getErrorMessage } from 'utils/helpers';

import { RETRY_MESSAGE } from 'constants/errorMessages';
import { INFO_ACCOMODATION, INFO_CUSTOM_GREETING } from 'constants/helpMessages';


const AddCoupleHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

const SingleGuest = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.baseSpacing * 2}px;
`;

const SingleGuestTitle = styled(H3)`
  margin-top: 0;
`;

const initialGuest = {
  firstName: '',
  lastName: '',
  allowPartner: false,
};

const initialGuestGroup = {
  customGreeting: '',
  allowAccomodation: false,
};

const initialState = {
  guestGroup: initialGuestGroup,
  guests: [{ ...initialGuest, id: 0 }, { ...initialGuest, id: 1 }],
};

export class AddCouple extends Component {
  state = initialState;

  onFirstNameChange = (guestId, firstName) => {
    this.setState(prevState => {
      const guests = prevState.guests.map(guest =>
        guest.id === guestId ? { ...guest, firstName } : guest
      );
      return { guests };
    });
  };

  onLastNameChange = (guestId, lastName) => {
    this.setState(prevState => {
      const guests = prevState.guests.map(guest =>
        guest.id === guestId ? { ...guest, lastName } : guest
      );
      return { guests };
    });
  };

  onGuestGroupCustomGreetingChange = customGreeting => {
    this.setState(prevState => ({
      guestGroup: { ...prevState.guestGroup, customGreeting },
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

  render() {
    const { weddingId, handleAddSuccess } = this.props;
    const { guests, guestGroup } = this.state;

    return (
      <Mutation
        mutation={ADD_GUESTS}
        onCompleted={() => {
          handleAddSuccess(this.state);
          this.setState(initialState);
          window.scrollTo(0, 0);
        }}
        refetchQueries={[
          { query: GET_WEDDING_INITIAL_DATA, variables: { id: weddingId } },
        ]}
        variables={{
          weddingId: weddingId,
          name: guestGroup.name,
          customGreeting: guestGroup.customGreeting,
          allowAccomodation: guestGroup.allowAccomodation,
          guests: guests.map(guest => ({
            firstName: guest.firstName,
            lastName: guest.lastName,
            allowPartner: guest.allowPartner,
          })),
        }}
      >
        {(addNewGuest, { loading, error }) => {
          return (
            <AddCoupleHolder>
              <Form onSubmit={addNewGuest}>
                {guests.map((guest, index) => {
                  return (
                    <SingleGuest key={guest.id}>
                      <SingleGuestTitle>
                        {femaleOrdinalNumbers[index + 1]} osoba
                      </SingleGuestTitle>
                      <InputLabel forHtml="firstName">imię</InputLabel>
                      <Input
                        name="firstName"
                        value={guest.firstName}
                        type="text"
                        placeholder="Jan"
                        onChange={e =>
                          this.onFirstNameChange(guest.id, e.target.value)
                        }
                        dense
                      />
                      <InputLabel forHtml="lastName">nazwisko</InputLabel>
                      <Input
                        name="lastName"
                        value={guest.lastName}
                        type="text"
                        placeholder="Nowak"
                        onChange={e =>
                          this.onLastNameChange(guest.id, e.target.value)
                        }
                      />
                    </SingleGuest>
                  );
                })}
                <InputLabel forHtml="customGreeting">
                  personalizowane przywitanie <MutedText>(opcjonalne)</MutedText><Tooltip text={INFO_CUSTOM_GREETING} />
                </InputLabel>
                <Input
                  name="customGreeting"
                  value={guestGroup.customGreeting}
                  type="text"
                  placeholder="Elo, Ziomeczki!"
                  onChange={e =>
                    this.onGuestGroupCustomGreetingChange(e.target.value)
                  }
                  dense
                />
                <Checkbox
                  value="allowAccomodation"
                  label="Pozwól na dodanie opcji noclegu"
                  checked={guestGroup.allowAccomodation}
                  onChange={this.toggleAllowAccomodation}
                  adornment={<Tooltip text={INFO_ACCOMODATION} />}
                />
                <br />
                <ActionButton
                  type="button"
                  onClick={addNewGuest}
                  label="Dodaj gości"
                  loading={loading}
                  error={error && (getErrorMessage(error) || RETRY_MESSAGE)}
                  dense
                />
              </Form>
            </AddCoupleHolder>
          );
        }}
      </Mutation>
    );
  }
}
