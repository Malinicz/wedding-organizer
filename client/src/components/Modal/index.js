import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { styledTheme, keyframes } from 'styles';

import { Card } from 'components/base';
import { FloatingButton } from 'components';

const overlayAnimation = keyframes`
  from { background: rgba(0, 0, 0, 0);}
  to { background: rgba(0, 0, 0, 0.3);}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  animation: ${overlayAnimation} 0.7s ease;
  animation-fill-mode: forwards;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const modalAnimation = keyframes`
  from { transform: translate(-50%, -700px);}
  to { transform: translate(-50%, 0px);}
`;

const ModalHolder = styled(Card)`
  position: absolute;
  top: 0;
  left: calc(50% - 15px);
  margin: 50px 15px;
  width: calc(100% - 30px);
  box-sizing: border-box;
  z-index: 10;
  box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.3);
  animation: ${modalAnimation} 0.3s ease;
  animation-fill-mode: forwards;
`;

const ModalTitle = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.secondary.regular};
  font-size: 2em;
  text-align: center;
  line-height: 1.2em;
`;

const CloseArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const ModalContent = styled.div`
  margin-top: 50px;
`;

export class Modal extends React.Component {
  static Title = ModalTitle;
  static Content = ModalContent;

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'initial';
  }

  render() {
    const { children, handleClose } = this.props;

    return ReactDOM.createPortal(
      <Overlay>
        <ModalHolder>
          <FloatingButton
            handleClick={handleClose}
            style={{
              top: '15px',
              right: '15px',
              backgroundColor: styledTheme.colors.brightest,
              color: styledTheme.colors.primaryDarker,
            }}
          />
          {children}
        </ModalHolder>
        <CloseArea onClick={handleClose} />
      </Overlay>,
      document.body
    );
  }
}
