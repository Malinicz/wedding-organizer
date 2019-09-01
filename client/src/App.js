import React, { Component } from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { ApolloProvider } from 'react-apollo';
import {
  GlobalStyles,
  styledTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styles';

import { client } from 'graphql/client';

import {
  PrivateRoute,
  GuestRoute,
  ScrollToTop,
  ToastProvider,
} from 'components';
import {
  SignIn,
  SignUp,
  PageNotFound,
  Guest,
  Home,
  // About,
  Organiser,
} from 'scenes';
import { FormSubmissionSuccess } from 'scenes/Guest/scenes';
// import { SubscriberSubmissionSuccess } from 'scenes/About/scenes';

import {
  SIGN_IN,
  GUEST,
  HOME,
  // ABOUT,
  GUEST_FORM_SUBMISSION_SUCCESS,
  // ABOUT_SUBSCRIBER_SUBMISSION_SUCCESS,
  ORGANISER_WEDDING,
  SIGN_UP,
} from 'constants/routes';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <StyledThemeProvider theme={styledTheme}>
        <ToastProvider>
          <ApolloProvider client={client}>
            <BrowserRouter history={history}>
              <ScrollToTop>
                <Switch>
                  <Route exact path={HOME} component={Home} />
                  {/* <Route exact path={ABOUT} component={About} />
                  <Route
                    exact
                    path={ABOUT_SUBSCRIBER_SUBMISSION_SUCCESS}
                    component={SubscriberSubmissionSuccess}
                  /> */}
                  <Route exact path={SIGN_IN} component={SignIn} />
                  <Route exact path={SIGN_UP} component={SignUp} />
                  <GuestRoute
                    exact
                    path={GUEST_FORM_SUBMISSION_SUCCESS}
                    component={FormSubmissionSuccess}
                  />
                  <GuestRoute exact path={`${GUEST}/:id`} component={Guest} />
                  <PrivateRoute
                    path={`${ORGANISER_WEDDING}/:id`}
                    component={Organiser}
                  />
                  <Route component={PageNotFound} />
                </Switch>
              </ScrollToTop>
            </BrowserRouter>
            <GlobalStyles />
          </ApolloProvider>
        </ToastProvider>
      </StyledThemeProvider>
    );
  }
}

export default App;
