import styled from 'styled-components';
import { colors } from 'app/constants';

export const Input = styled.input`
  padding: 5px 10px;
  font-size: 0.9rem;
  border: 1px solid ${colors.white};
  border-radius: 2px;
  &:focus {
    outline: none;
    border: 1px solid ${colors.lightGray};
  }
`;
