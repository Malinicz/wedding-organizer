import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styles';

const ANIMATION_TIME = 1000;

const animation = keyframes`
  from { transform: scale(1); opacity: 0.2;}
  to { transform: scale(5); opacity: 0;}
`;

const AnimatedNumberHolder = styled.span`
  position: relative;
`

const BigNumber = styled.span`
  font-size: 1.5em;
  font-family: ${({ theme }) => theme.fontFamily.primary.bold};
`;

const NumberUnderneath = styled(BigNumber)`
  position: absolute;
  top: -0.2em;
  left: 0;
  animation: ${animation} ${ANIMATION_TIME / 1000}s ease;
  animation-fill-mode: forwards;
`

export const AnimatedNumber = ({ value }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [initialValue] = useState(value);

  useEffect(() => {
    let timer = null;

    if (initialValue !== value) {
      setShowAnimation(true);

      timer = setTimeout(() => {
        return setShowAnimation(false);
      }, ANIMATION_TIME);
    }

    return () => clearTimeout(timer);
  }, [value])

  return (
    <AnimatedNumberHolder>
      <BigNumber>{value}</BigNumber>
      {showAnimation && <NumberUnderneath>{value}</NumberUnderneath>}
    </AnimatedNumberHolder>
  );
}
