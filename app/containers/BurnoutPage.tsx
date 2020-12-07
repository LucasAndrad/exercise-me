import React from 'react';
import { shell } from 'electron';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import i18n from 'app/i18n';
import { IconClick, Paragraph, H2 } from 'app/components';
import { arrowLeftIcon } from 'app/assets/images';
import { routes } from 'app/constants/routes';

const Container = styled.div`
  padding: 2%;
`;

const Link = styled(Paragraph)`
  text-decoration: underline;
  cursor: pointer;
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
      <Link
        onClick={() =>
          shell.openExternal(
            'https://bvsms.saude.gov.br/bvs/publicacoes/saude_mental_volume_5.pdf'
          )
        }
      >
        {i18n.t('burnout.linkSus')}
      </Link>
      <Link
        onClick={() =>
          shell.openExternal('https://www.psicologia.pt/artigos/textos/A1054.pdf')
        }
      >
        {i18n.t('burnout.linkBurnout')}
      </Link>
    </Container>
  );
};
