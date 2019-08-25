import React, { Component } from 'react';
import styled, { keyframes } from 'styles';

import flamingo from 'assets/flamingo.png';

import { Icon } from '../Icon';

const TIMEOUT = 3000;
const HEIGHT = 60;

const toastAnimation = ({ index, theme }) => {
  const getYPosition = index => {
    return `${index * (HEIGHT + theme.baseSpacing) + theme.baseSpacing}px`;
  };

  return keyframes`
   0% { transform: translate3d(0, ${getYPosition(
     index
   )}, 0) scale(0); opacity: 0;}
  5% { transform: translate3d(0, ${getYPosition(
    index
  )}, 0) scale(1); opacity: 1;}
  8% { transform: translate3d(0, ${getYPosition(
    index
  )}, 0) scale(1.02); opacity: 1;}
  11% { transform: translate3d(0, ${getYPosition(
    index
  )}, 0) scale(0.98); opacity: 1;}
  13% { transform: translate3d(0, ${getYPosition(
    index
  )}, 0) scale(1.01); opacity: 1;}
  15% { transform: translate3d(0, ${getYPosition(
    index
  )}, 0) scale(1); opacity: 1;}
  84% { transform: translate3d(0, ${getYPosition(
    index
  )}, 0) scale(1); opacity: 1;}
  88% { transform: translate3d(0, ${getYPosition(
    index
  )}, 0) scale(1.02); opacity: 1;}
  90% { transform: translate3d(0, ${getYPosition(
    index
  )}, 0) scale(1); opacity: 1;}
  100% { transform: translate3d(0, ${getYPosition(
    index
  )}, 0) scale(0); opacity: 0;}
`;
};

const SingleToastHolder = styled.div`
  position: fixed;
  z-index: 1000;
  right: 15px;
  display: flex;
  align-items: center;
  width: auto;
  height: ${HEIGHT}px;
  border-radius: ${HEIGHT}px;
  transform: ${({ index }) =>
    `translate3d(0, ${index * (HEIGHT + 15) + 15}px, 0)`};
  background: ${({ theme }) => theme.colors.brightest};
  box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.1);
  animation: ${toastAnimation} ${TIMEOUT / 1000}s ease;
  animation-fill-mode: forwards;
  transition: 0.3s ease transform;
  box-sizing: border-box;
`;

const MessageHolder = styled.div`
  padding: ${({ theme }) =>
    `${theme.baseSpacing}px ${theme.baseSpacing * 2}px  ${
      theme.baseSpacing
    }px  ${theme.baseSpacing}px`};
  font-size: 0.9rem;
  white-space: nowrap;
`;

const ImageHolder = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.primaryDarkest};
`;

const Image = styled.img`
  width: 100%;
`;

const CloseIconHolder = styled.div`
  padding: ${({ theme }) => theme.baseSpacing}px;
  color: ${({ theme }) => theme.colors.primaryDarkest};
  margin-left: ${({ theme }) => -theme.baseSpacing * 2}px;
  cursor: pointer;
`;

export class SingleToast extends Component {
  timeout = null;

  componentDidMount() {
    const { handleClose } = this.props;

    this.timeout = setTimeout(() => {
      handleClose();
    }, TIMEOUT);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { message, handleClose, index } = this.props;

    return (
      <SingleToastHolder index={index}>
        <ImageHolder>
          <Image src={flamingo} />
        </ImageHolder>
        <MessageHolder>{message.text}</MessageHolder>
        <CloseIconHolder onClick={handleClose}>
          <Icon name="plus" size={15} style={{ transform: 'rotate(45deg)' }} />
        </CloseIconHolder>
      </SingleToastHolder>
    );
  }
}
