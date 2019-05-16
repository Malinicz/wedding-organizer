import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styles';

import { ActionButton, Checkbox } from 'components';
import { Form, InputLabel, Input, Button } from 'components/base';

import { ADD_NEW_GUEST } from 'graphql/mutations';

const SingleGuest = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

export class Wedding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestGroup: {
        name: '',
        code: '',
        customGreeting: '',
        allowAccomodation: true,
      },
      guests: [],
    };
  }

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

  onAddNewGuest = () => {
    this.setState(prevState => ({
      guests: [
        ...prevState.guests,
        {
          id: prevState.guests.length + 1,
          firstName: '',
          lastName: '',
          allowPartner: false,
          isPresent: true,
          isVegetarian: false,
        },
      ],
    }));
  };

  onGuestGroupCodeChange = code => {
    this.setState(prevState => ({
      guestGroup: { ...prevState.guestGroup, code },
    }));
  };

  onGuestGroupNameChange = name => {
    this.setState(prevState => ({
      guestGroup: { ...prevState.guestGroup, name },
    }));
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
    const {
      match: {
        params: { id: weddingId },
      },
    } = this.props;

    const { guests, guestGroup } = this.state;

    return (
      <Mutation
        mutation={ADD_NEW_GUEST}
        variables={{
          weddingId: weddingId,
          name: guestGroup.name,
          code: guestGroup.code,
          customGreeting: guestGroup.customGreeting,
          allowAccomodation: guestGroup.allowAccomodation,
          guests: guests.map(guest => ({
            firstName: guest.firstName,
            lastName: guest.lastName,
            allowPartner: guest.allowPartner,
            isPresent: true,
            isVegetarian: false,
          })),
        }}
      >
        {(addNewGuest, { loading, error }) => {
          return (
            <div
              style={{
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <InputLabel forHtml="name">nazwa grupy</InputLabel>
              <Input
                name="name"
                value={guestGroup.name}
                type="text"
                placeholder="Nowakowie"
                onChange={e => this.onGuestGroupNameChange(e.target.value)}
              />
              <InputLabel forHtml="code">kod grupy</InputLabel>
              <Input
                name="code"
                value={guestGroup.code}
                type="text"
                placeholder="J43KS"
                onChange={e => this.onGuestGroupCodeChange(e.target.value)}
              />
              <InputLabel forHtml="code">przywitanie</InputLabel>
              <Input
                name="customGreeting"
                value={guestGroup.customGreeting}
                type="text"
                placeholder="Elo, Ziomeczki!"
                onChange={e =>
                  this.onGuestGroupCustomGreetingChange(e.target.value)
                }
              />
              <Checkbox
                value="allowAccomodation"
                label="Pozwól na dodanie opcji noclegu"
                checked={guestGroup.allowAccomodation}
                onChange={this.toggleAllowAccomodation}
              />
              <Button onClick={this.onAddNewGuest}>dodaj gościa</Button>
              <Form onSubmit={addNewGuest}>
                {guests.map(guest => {
                  return (
                    <SingleGuest key={guest.id}>
                      <InputLabel forHtml="firstName">imię</InputLabel>
                      <Input
                        name="firstName"
                        value={guest.firstName}
                        type="text"
                        placeholder="Jan"
                        onChange={e =>
                          this.onFirstNameChange(guest.id, e.target.value)
                        }
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
                      <Checkbox
                        value="allowPartner"
                        label="Pozwól na dodanie Osoby Towarzyszącej"
                        checked={guest.allowPartner}
                        onChange={() => this.toggleAllowPartner(guest.id)}
                      />
                    </SingleGuest>
                  );
                })}
                <ActionButton
                  type="button"
                  onClick={addNewGuest}
                  style={{ marginTop: '5px' }}
                  label="Zapisz"
                  loading={loading}
                  error={error && 'coś nie tak'}
                />
              </Form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
