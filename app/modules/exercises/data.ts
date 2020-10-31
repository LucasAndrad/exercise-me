import * as exercisesImages from 'app/assets/images';

// duration in seconds
export const exercises = {
  1: {
    id: 1,
    duration: 15,
    repeat: false,
    switchSide: true,
    rounds: 2,
    image: exercisesImages.exercise1,
    title: 'Flexão lateral do tronco',
    description:
      'Corpo bem esticado, pernas alinhadas na lateral e levemente à frente, com o apoio na lateral do pé (pé de trás). Flexionar o tronco lateralmente com o braço oposto à perna que está atrás esticado acima e mão voltada para fora. O braço correspondente à perna que está atrás permanece ao lado do corpo por 15 segundos para cada lado. Exercício com dificuldade no equilíbrio dinamiza força lateral do tronco',
  },
  2: {
    id: 2,
    duration: false,
    repeat: 10,
    switchSide: true,
    rounds: 2,
    image: exercisesImages.exercise2,
    title: 'Postura e alongamento peitoral com rotação do tronco',
    description:
      'Posição inicial: em pé, pernas afastadas lateralmente, joelhos semifle- xionados e quadril encaixado. Execução: girar os braços esticados para os lados, primeiro para a direita e depois para a esquerda. Repetição: repetir 10 vezes a rotação completa, sem parar. Objetivo: mobilização da articulação do quadril',
  },
  3: {
    id: 3,
    duration: 15,
    repeat: false,
    switchSide: true,
    rounds: 2,
    image: exercisesImages.exercise3,
    title: 'Fortalecimento de tríceps e ombros',
    description:
      'De pé, pernas levemente afastadas e joelhos semiflexionados, um braço acima da cabeça, o outro atrás do corpo, na altura da cintura, forçar os braços ao mesmo tempo, mantendo sempre os ombros alinhados. Em seguida, inverter os braços. Repetições: 15 vezes ou 15 segundos.',
  },
  4: {
    id: 4,
    duration: 15,
    repeat: false,
    switchSide: true,
    rounds: 2,
    image: exercisesImages.exercise4,
    title: 'Rotação dos ombros',
    description:
      'De pé, braços ao lado do corpo, fazer a rotação do ombro para frente e depois para trás. Repetir 10 vezes em cada um dos sentidos. Tempo total de 30 segundos.',
  },
  5: {
    id: 5,
    duration: 10,
    repeat: false,
    switchSide: false,
    rounds: 3,
    image: exercisesImages.exercise5,
    title: 'Alongamento dorsal, ombros e posterior da coxa',
    description:
      'Posição inicial: em pé, pernas afastadas e joelhos esticados. Execução: soltar o peso do corpo para frente e tocar as mãos no chão ou em cada um dos pés. Repetir 3 vezes, mantendo 10 segundos no chão. Objetivo: alongamento do tronco e parte posterior das pernas.',
  },
  6: {
    id: 6,
    duration: 30,
    repeat: false,
    switchSide: false,
    rounds: 1,
    image: exercisesImages.exercise6,
    title: 'Estimulação na ponta dos pés e calcanhar',
    description:
      'De pé, braços semiflexionados à frente, elevar-se na ponta dos pés e nos calcanhares. Quando na ponta dos pés, deslocar para frente e deslocar para trás quando apoiado nos calcanhares. Repetições: 30 segundos em cada posição.',
  },
};
