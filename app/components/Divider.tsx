import styled from 'styled-components';
import { colors } from 'app/constants';

type DividerProps = {
  width?: string;
};

export const Divider = styled.div<DividerProps>`
  width: ${(props) => props.width || '90%'};
  height: 1px;
  background-color: ${colors.lightGray};
  margin: 5% auto;
`;
