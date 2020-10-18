import * as exercisesImages from 'app/assets/images';
import { secondsToMiliseconds } from './utils';

export const exercises = {
  exercise1: {
    duration: secondsToMiliseconds(15),
    repeat: false,
    switchSide: true,
    image: exercisesImages.exercise1,
    description:
      'Corpo bem esticado, pernas alinhadas na lateral e levemente à frente, com o apoio na lateral do pé (pé de trás). Flexionar o tronco lateralmente com o braço oposto à perna que está atrás esticado acima e mão voltada para fora. O braço correspondente à perna que está atrás permanece ao lado do corpo por 15 segundos para cada lado. Exercício com dificuldade no equilíbrio dinamiza força lateral do tronco',
  },
  exercise2: {
    duration: false,
    repeat: 10,
    switchSide: true,
    image: exercisesImages.exercise2,
    description:
      'Posição inicial: em pé, pernas afastadas lateralmente, joelhos semifle- xionados e quadril encaixado. Execução: girar os braços esticados para os lados, primeiro para a direita e depois para a esquerda. Repetição: repetir 10 vezes a rotação completa, sem parar. Objetivo: mobilização da articulação do quadril',
  },
};
