import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import { ActionButton, Checkbox, Icon, Tooltip } from 'components';
import {
  Form,
  InputLabel,
  Input,
  H3,
  RoundButton,
  MutedText
} from 'components/base';

import { ADD_GUESTS } from 'graphql/mutations';
import { GET_WEDDING_INITIAL_DATA } from 'graphql/queries';

import { getErrorMessage } from 'utils/helpers';

import { RETRY_MESSAGE } from 'constants/errorMessages';
import { INFO_ACCOMODATION, INFO_PARTNER, INFO_CUSTOM_GREETING } from 'constants/helpMessages';

const AddGroupHolder = styled.div`
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

const AddGuestButtonHolder = styled.div`
  display: flex;
  justify-content: space-between;
`

const AddGuestButton = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  max-width: 200px;
  padding: ${({ theme }) => theme.baseSpacing * 2}px;
  margin-bottom: ${({ theme }) => theme.baseSpacing * 3}px;
  color: ${({ theme }) => theme.colors.darkest};
  border: ${({ theme }) => `1px dashed ${theme.colors.primaryDarker}`};
  border-radius: 8px;
  cursor: pointer;
`;

const initialGuest = {
  firstName: '',
  lastName: '',
  allowPartner: false,
  isChild: false
};

const initialGuestGroup = {
  customGreeting: '',
  allowAccomodation: false,
};

const initialState = {
  guestGroup: initialGuestGroup,
  guests: [],
};

export class AddGroup extends Component {
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

  toggleAllowPartner = guestId => {
    this.setState(prevState => {
      const guests = prevState.guests.map(guest =>
        guest.id === guestId
          ? { ...guest, allowPartner: !guest.allowPartner }
          : guest
      );
      return { guests };
    });
  };

  onAddNewGuest = ({ isChild }) => {
    this.setState(prevState => {
      const guests = [
        ...prevState.guests,
        { ...initialGuest, id: prevState.guests.length, isChild },
      ];
      return {
        guests,
      };
    });
  };

  render() {
    const { weddingId, handleAddSuccess } = this.props;
    const { guests, guestGroup } = this.state;

    const hasGuests = guests.length > 0;

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
            <AddGroupHolder>
              <Form onSubmit={addNewGuest}>
                {guests.map((guest, index) => {
                  return (
                    <SingleGuest key={guest.id}>
                      <SingleGuestTitle>
                        {guest.isChild ? 'Dziecko' : 'Dorosły'}
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
                        dense
                      />
                      <Checkbox
                        value="allowPartner"
                        label="Pozwól na dodanie Osoby Towarzyszącej"
                        checked={guest.allowPartner}
                        onChange={() => this.toggleAllowPartner(guest.id)}
                        dense={false}
                        adornment={<Tooltip text={INFO_PARTNER} />}
                      />
                    </SingleGuest>
                  );
                })}
                <AddGuestButtonHolder>
                  <AddGuestButton onClick={() => this.onAddNewGuest({ isChild: false })}>
                    <RoundButton type="button">
                      <Icon name="plus" />
                    </RoundButton>
                    <span style={{ marginLeft: 7 }}>Dodaj dorosłego</span>
                  </AddGuestButton>
                  <AddGuestButton onClick={() => this.onAddNewGuest({ isChild: true })}>
                    <RoundButton type="button">
                      <Icon name="plus" />
                    </RoundButton>
                    <span style={{ marginLeft: 7 }}>Dodaj dziecko</span>
                  </AddGuestButton>
                </AddGuestButtonHolder>
                <InputLabel forHtml="customGreeting" disabled={!hasGuests}>
                  personalizowane przywitanie <MutedText>(opcjonalne)</MutedText>{hasGuests && <Tooltip text={INFO_CUSTOM_GREETING} />}
                </InputLabel>
                <Input
                  name="customGreeting"
                  value={guestGroup.customGreeting}
                  type="text"
                  placeholder="Cześć, Rodzinko Kowalskich!"
                  onChange={e =>
                    this.onGuestGroupCustomGreetingChange(e.target.value)
                  }
                  disabled={!hasGuests}
                  dense
                />
                <Checkbox
                  value="allowAccomodation"
                  label="Pozwól na dodanie opcji noclegu"
                  checked={guestGroup.allowAccomodation}
                  onChange={this.toggleAllowAccomodation}
                  adornment={<Tooltip text={INFO_ACCOMODATION} />}
                  disabled={!hasGuests}
                />
                <br />
                <ActionButton
                  type="button"
                  onClick={addNewGuest}
                  label="Dodaj gości"
                  loading={loading}
                  error={error && (getErrorMessage(error) || RETRY_MESSAGE)}
                  disabled={!hasGuests}
                  dense
                />
              </Form>
            </AddGroupHolder>
          );
        }}
      </Mutation>
    );
  }
}
