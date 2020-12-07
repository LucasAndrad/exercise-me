import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import i18n from 'app/i18n';
import { IconClick, Paragraph, H2 } from 'app/components';
import { arrowLeftIcon } from 'app/assets/images';
import { routes } from 'app/constants/routes';

const Container = styled.div`
  padding: 2%;
`;

export const BurnoutPage = () => {
  const history = useHistory();

  return (
    <Container>
      <IconClick
        width="25"
        height="25"
        src={arrowLeftIcon}
        alt="arrow-left-icon"
        onClick={() => history.push(routes.PANEL)}
      />
      <H2>{i18n.t('burnout.title')}</H2>
      <Paragraph>{i18n.t('burnout.text')}</Paragraph>
    </Container>
  );
};
