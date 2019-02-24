import styled from 'styles';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Link = styled.a`
  &:visited {
    color: ${({ theme }) => theme.colors.primaryDarkest};
  }
  &:link {
    color: ${({ theme }) => theme.colors.primaryDarkest};
  }
  &:active {
    color: ${({ theme }) => theme.colors.primaryDarkest};
    transform: scale(0.98);
  }
`;

export const RouterLink = styled(Link.withComponent(ReactRouterLink))``;
