import styled from 'styles';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Link = styled.a`
  &:visited {
    color: ${({ theme }) => theme.colors.primaryDarkest};
  }
`;

export const RouterLink = styled(Link.withComponent(ReactRouterLink))``;
