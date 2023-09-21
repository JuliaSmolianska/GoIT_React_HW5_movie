import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  padding: 10px;
  color: black;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.5;

  &.active {
    color: brown;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLinkList = styled(NavLink)`
  text-decoration: none;
  padding: 10px;
  color: black;
 
  line-height: 1.5;

  &.active {
    color: brown;
  }

  &:hover {
    text-decoration: underline;
  }
`;
