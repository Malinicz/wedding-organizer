import React, { Component } from 'react';
import { Mutation, ApolloProvider } from 'react-apollo';
import styled, { ThemeProvider as StyledThemeProvider, GlobalStyles, styledTheme, } from 'styles';
import validator from 'validator';

import { Layout, Main, Header, Icon, ActionButton } from 'components';
import {
  H1,
  Section,
  RoundButton,
  Card as CardBase,
  Input,
  Paragraph,
  Form,
} from 'components/base';

import { CREATE_SUBSCRIBER } from 'graphql/mutations';

import { client } from 'graphql/client';

import { RETRY_MESSAGE } from 'constants/errorMessages';
import { ABOUT_SUBSCRIBER_SUBMISSION_SUCCESS } from 'constants/routes';

import logo from 'assets/logo.png';

const AboutHeader = styled(Header)`
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  padding: ${({ theme }) => theme.baseSpacing}px;
`;

const Logo = styled.img`
  width: 230px;

  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    width: 200px;
  }
`;

const SubmitToNewsletterHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  text-align: center;
`;

const SubmitToNewsletterTitle = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CallToActionSection = styled(Section)`
  flex-direction: column;
  align-items: center;
`;

const CallToActionText = styled(Paragraph)`
  max-width: 600px;
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
  font-size: 1.2em;
  line-height: 1.6em;
  text-align: center;
`;

const Title = styled(H1)`
  text-align: center;
  font-size: 2.2em;
`;

const Subtitle = styled.p`
  padding-top: 20px;
  padding-bottom: 30px;
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.primary.bold};
  font-size: 1.2em;
  line-height: 1.4em;
`;

const Cards = styled(Section)`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto 20px auto;
`;

const Card = styled(CardBase)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  padding: 30px;
  text-align: center;
  margin: 15px;
`;

const CardTitle = styled.h2`
  font-size: 1.2em;
  font-family: ${({ theme }) => theme.fontFamily.primary.bold};
  line-height: 1.4em;
`;

const CardSubtitle = styled.h3`
  font-size: 1em;
  font-family: ${({ theme }) => theme.fontFamily.primary.regular};
  line-height: 1.4em;
`;

const NewsletterForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const NewsletterInput = styled(Input)`
  margin-top: 40px;
  margin-bottom: 15px;
`;

export class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  onEmailChange = email => {
    this.setState({ email });
  };

  render() {
    const { history } = this.props;
    const { email } = this.state;

    return (
      <StyledThemeProvider theme={styledTheme}>
        <ApolloProvider client={client}>
          <Layout>
            <AboutHeader>
              <Logo src={logo} />
              <Title>Witaj, Gościu!</Title>
              <Subtitle>
                Dupskooooo “Witaj, Gościu!” to aplikacja, która pozwoli Ci w łatwy i przyjemny
            sposób zarządzać swoimi Gośćmi weselnymi{' '}
                <span role="img" aria-label="imprezowa buźka">
                  🥳
            </span>
                .
          </Subtitle>
              <SubmitToNewsletterHolder>
                <SubmitToNewsletterTitle>
                  Zapisz się do newslettera i zyskaj zniżkę!
            </SubmitToNewsletterTitle>
                <RoundButton
                  onClick={() =>
                    window.scroll({
                      top: document.body.scrollHeight,
                      behavior: 'smooth',
                    })
                  }
                >
                  <Icon name="arrowDown" size={20} />
                </RoundButton>
              </SubmitToNewsletterHolder>
            </AboutHeader>
            <Main>
              <Cards>
                <Card>
                  <Icon name="notepad" size={100} />
                  <CardTitle>
                    Dodawaj i edytuj swoich Gości gdzie tylko chcesz
              </CardTitle>
                  <CardSubtitle>
                    Dzięki naszej aplikacji dostępnej w przeglądarce, Google Play
                oraz App Store Twoja lista Gości będzie zawsze pod ręką{' '}
                    <span role="img" aria-label="buźka w okularach">
                      😎
                </span>
                  </CardSubtitle>
                </Card>
                <Card>
                  <Icon name="alarmClock" size={100} />
                  <CardTitle>Oszczędzaj swój czas</CardTitle>
                  <CardSubtitle>
                    Wygeneruj i dołącz do zaproszeń kody, aby Twoi Goście mogli się
                    zalogować do aplikacji i uzupełnić wszystkie informacje, które
                potrzebujesz{' '}
                    <span role="img" aria-label="gest idealnie">
                      👌
                </span>
                  </CardSubtitle>
                </Card>
                <Card>
                  <Icon name="piggyBank" size={100} />
                  <CardTitle>Oszczędzaj pieniądze</CardTitle>
                  <CardSubtitle>
                    “Witaj, Gościu” na podstawie zebranych danych podpowie Ci, ile i
                jakiego alkoholu potrzebujesz{' '}
                    <span role="img" aria-label="kieliszek wina">
                      🍷
                </span>
                  </CardSubtitle>
                </Card>
                <Card>
                  <Icon name="contact" size={100} />
                  <CardTitle>Bądź w kontakcie</CardTitle>
                  <CardSubtitle>
                    Powiadom swoich Gości o adresach noclegów czy zmianie planów
                jednym kliknięciem{' '}
                    <span role="img" aria-label="myszka komputerowa">
                      🖱️
                </span>
                  </CardSubtitle>
                </Card>
              </Cards>
              <CallToActionSection>
                <CallToActionText>
                  Aktualnie testujemy naszą aplikację na każdą ewentualność
              <span role="img" aria-label="ogień">
                    🔥
              </span>
                  . Zapisz się do naszego newslettera, a wyślemy Ci kod ze zniżką i
                  poinformujemy, gdy aplikacja będzie gotowa!
            </CallToActionText>
                <Mutation
                  mutation={CREATE_SUBSCRIBER}
                  onCompleted={() =>
                    history.push(ABOUT_SUBSCRIBER_SUBMISSION_SUCCESS)
                  }
                >
                  {(createSubscriber, { loading, error }) => {
                    return (
                      <NewsletterForm
                        id="newsletter"
                        onSubmit={e => {
                          e.preventDefault();
                          createSubscriber({ variables: { email } });
                        }}
                      >
                        <NewsletterInput
                          name="email"
                          type="text"
                          placeholder="janina.nowak@gmail.com"
                          onChange={e => this.onEmailChange(e.target.value)}
                        />
                        <ActionButton
                          type="submit"
                          style={{ marginTop: '5px' }}
                          label="Zapisz!"
                          disabled={!email || !validator.isEmail(email)}
                          loading={loading}
                          error={error && RETRY_MESSAGE}
                        />
                      </NewsletterForm>
                    );
                  }}
                </Mutation>
              </CallToActionSection>
            </Main>
          </Layout>
          <GlobalStyles />
        </ApolloProvider>
      </StyledThemeProvider>
    );
  }
}
