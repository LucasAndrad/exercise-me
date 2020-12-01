import styled from 'styled-components';
import { checkIcon } from 'app/assets/images';

export const Checkbox = styled.input`
  visibility: visible !important;
  min-width: 20px;
  -webkit-appearance: none;
  border: 2px solid #ffffff;
  padding: 8px;
  border-radius: 3px;
  margin-right: 15px;
  position: relative;
  top: 4px;
  cursor: pointer;
  &:focus {
    border: 2px solid #ffffff;
    outline: none;
  }
  &:checked {
    background-image: url(${checkIcon});
    background-size: 120%;
    background-position: center;
    outline: none;
  }
`;
