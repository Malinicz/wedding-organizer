import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTopComp extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export const ScrollToTop = withRouter(ScrollToTopComp);
