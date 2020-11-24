import styled from 'styled-components';
import { colors } from 'app/constants';

export const Button = styled.button`
  text-align: center;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  background: ${colors.buttonBlue};
  color: ${colors.white};
  transition: background 1s;
  &:hover {
    background: ${colors.buttonHoverBlue};
  }
`;
