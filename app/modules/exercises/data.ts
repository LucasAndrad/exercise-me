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
      'Posição inicial: em pé, pernas afastadas lateralmente, joelhos semiflexionados e quadril encaixado. Execução: girar os braços esticados para os lados, primeiro para a direita e depois para a esquerda. Repetição: repetir 10 vezes a rotação completa, sem parar. Objetivo: mobilização da articulação do quadril',
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
  7: {
    id: 7,
    duration: 10,
    repeat: false,
    switchSide: true,
    title: 'Alongamento lombar e quadríceps',
    description:
      'De pé, apoiado em uma parede, flexionar uma das pernas para trás e segurar o pé com uma das mãos; com a outra mão apoiada na parede para se equilibrar, segurar por 10 segundos. Alternar a perna. Repetições: 10 a 15 vezes para cada perna',
  },
  8: {
    id: 8,
    duration: 15,
    repeat: false,
    switchSide: true,
    rounds: 2,
    title: 'Alongamento da perna com uso de flexibilidade',
    description:
      'Uma das pernas estendida para o lado, com apoio no calcanhar e mãos apoiadas na cintura. Flexionar a perna lateralmente, deslocando o peso do corpo para o lado esquerdo e depois para o direito. Se necessário, apoiar a mão no chão para manter o equilíbrio e estimular o alongamento de panturrilha e coxa. Permanecer na posição por 15 segundos e depois inverter o lado',
  },
  9: {
    id: 9,
    duration: 10,
    repeat: false,
    switchSide: true,
    rounds: 2,
    title: 'Estimulação do pescoço',
    description:
      'Flexão lateral do pescoço, com auxílio da mão sobre a cabeça. Repetições: 10 vezes para cada lado',
  },
  10: {
    id: 10,
    duration: 15 * 15,
    repeat: false,
    switchSide: true,
    rounds: 2,
    title: 'Extensão do tronco',
    description:
      'Posição Inicial: em pé, uma perna à frente e outra levemente afastada, braços estendidos para cima na lateral da cabeça. Flexionar a perna que está à frente e estender a que está atrás, mantendo o corpo estendido, alternar as pernas. Manter-se em cada posição por 15 segundos e repetir entre 15 e 20 vezes cada perna',
  },
  11: {
    id: 11,
    duration: 10,
    repeat: false,
    switchSide: true,
    rounds: 2,
    title: 'Flexão do tronco em deslocamento',
    description:
      'Posição Inicial: em pé, uma perna à frente e outra levemente afastada, braços estendidos ao longo do corpo. Caminhar lentamente e a cada passo flexionar o corpo à frente, tocando os pés alternadamente, mantendo sempre os joelhos semiflexionados. Manter em cada posição por 10 segundos, repetir entre 15 e 20 vezes cada perna',
  },
  12: {
    id: 12,
    duration: 10 * 15,
    repeat: false,
    switchSide: true,
    rounds: 2,
    title: 'Abdução do ombro',
    description:
      'Posição Inicial: em pé, pernas levemente afastadas, braços na lateral. Elevar os braços simultaneamente, fazendo com os mesmos se encontrem acima da cabeça; segurar nessa posição por 10 segundos, em seguida baixá-los até a altura da cintura. Repetir entre 15 e 20 vezes',
  },
  13: {
    id: 13,
    duration: 15 * 10,
    repeat: false,
    switchSide: true,
    rounds: 2,
    title: 'Extensão do punho',
    description:
      'Estender a mão esquerda à frente e segurar com a mão direita, fazendo com que o dedo polegar encoste no antebraço. Segurar por 10 segundos. Fazer o mesmo com a mão direita. Repetir entre 15 e 20 vezes cada mão.',
  },
  14: {
    id: 14,
    duration: 10 * 10,
    repeat: false,
    switchSide: true,
    rounds: 2,
    title: 'Rotação lateral do tronco',
    description:
      'Posição inicial: em pé, de costas para uma parede, braços levemente flexionados e à frente do corpo. Girar o corpo para a lateral, tocando a parede com a palma da mão, ora de um lado ora de outro; segurar por 10 segundos cada lado. Repetir entre 10 e 15 vezes cada lado',
  },
  15: {
    id: 15,
    duration: 10 * 10,
    repeat: false,
    switchSide: true,
    rounds: 2,
    title: 'Flexão do tronco à frente',
    description:
      'Posição inicial: em pé, pernas afastadas, antero lateral, joelhos semiflexionados, braços estendidos para cima na lateral da cabeça. Flexionar o corpo para frente até tocar o pé direito, segurar por 10 segundos, levantar elevando os braços acima da cabeça e repetir o mesmo movimento tocando o pé esquerdo. Repetir por 10 a 15 vezes cada lado',
  },
  16: {
    id: 16,
    duration: 10 * 10,
    repeat: false,
    switchSide: true,
    rounds: 2,
    title: 'Extensão de joelhos e tornozelos',
    description:
      'Posição inicial: em pé, pernas levemente afastadas e joelhos semiflexionados. Com a mão direita, segurar o pé esquerdo, por trás do corpo, segurar por 10 segundos, fazer o mesmo com o pé direito; caso não consiga se equilibrar, apoiar-se em algum objeto ou em uma parede. O exercício pode ser executado em dupla, um apoiando no ombro do outro. Repetir por 10 a 15 vezes',
  },
  17: {
    id: 17,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Alongar coluna espreguiçando',
    description:
      'Posição Inicial: em pé, pernas afastadas lateralmente, joelhos semiflexionados e quadril encaixado. Elevar os braços acima da cabeça, alongar o máximo que conseguir, girar o corpo para esquerda e para a direita, respirar lenta e profundamente a cada alongada e segurar por 10 segundos. Repetir por 10 a 15 vezes',
  },
  18: {
    id: 18,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Alongar músculo peitoral',
    description:
      'Posição inicial: em pé, pernas levemente afastadas, joelhos semiflexionados e quadril encaixado. Posicionar os braços esticados por trás do corpo, elevar e baixar os mesmos, ao elevar segurar por 10 segundos. Repetir por 10 a 15 vezes',
  },
  19: {
    id: 19,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Alongar braços e peitoral',
    description:
      'Posição inicial: sentado em uma cadeira, costas “coladas” ao encosto, pés apoiados no chão e mãos apoiadas nos joelhos. Elevar os braços acima da cabeça, alongando para trás o máximo que conseguir, segurar por 10 segundos e voltar na posição inicial. Repetir por 10 a 15 vezes',
  },
  20: {
    id: 20,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Abdução de ombro',
    description:
      'Posição Inicial: em pé, pernas levemente afastadas, joelhos semiflexionados, quadril encaixado, braços estendidos na lateral do corpo. Elevar os braços simultaneamente para o alto, cruzando-os acima da cabeça, segurar por 10 segundos e voltar à posição inicial. Repetir por 10 a 15 vezes',
  },
  21: {
    id: 21,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Flexão frontal do tronco',
    description:
      'Posição inicial: sentado, costas encostadas no encosto da cadeira, pés totalmente apoiados no solo e braços estendidos ao longo do corpo. Flexionar o tronco à frente, tocando os tornozelos com as mãos, segurar por 10 segundos e voltar à posição inicial. Repetir por 10 a 15 vezes.',
  },
  22: {
    id: 22,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Flexão de tronco',
    description:
      'Posição inicial: Em pé, próximo a uma parede, pés apoiados na parede, braços estendidos ao longo do corpo e pernas levemente afastadas à frente. Flexionar o corpo à frente, com os braços apoiados nos glúteos e segurar por 10 segundos. Repetir por 10 a 15 vezes',
  },
  23: {
    id: 23,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Flexão de braço',
    description:
      'Posição inicial: em pé, pernas levemente afastadas na lateral, joelhos semiflexionados e quadril encaixado. Segurar um cabo de vassoura, atrás da nuca, elevar os braços acima da cabeça, segurar por 10 segundos e voltar. Repetir por 10 a 15 vezes',
  },
  24: {
    id: 24,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Flexão lateral de tronco',
    description:
      'Posição inicial: em pé, pernas levemente afastadas na lateral, joelhos semiflexionados e quadril encaixado. Segurar um cabo de vassoura acima da cabeça, flexionar o corpo lentamente para os lados, segurando por 10 segundos cada lado. Repetir por 10 a 15 vezes',
  },
  25: {
    id: 25,
    duration: 10 * 3,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Extensão de braços',
    description:
      'Posição inicial: em pé, pernas levemente afastadas na lateral, joelhos semiflexionados e quadril encaixado. Segurar um cabo de vassoura acima da cabeça, baixar e elevar os braços estendidos à frente do corpo. Repetir por 10 a 15 vezes',
  },
  26: {
    id: 26,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Extensão de cotovelos',
    description:
      'Posição inicial: em pé, pernas levemente afastadas na lateral, joelhos semiflexionados e quadril encaixado. Segurar uma bola acima da cabeça com as duas mãos, flexionar o cotovelo para trás, sem soltar a bola; segurar por 10 segundos e elevar novamente até a posição inicial. Repetir por 10 a 15 vezes',
  },
  27: {
    id: 27,
    duration: 10 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Flexão de cotovelos',
    description:
      'Posição inicial: em pé, pernas levemente afastadas na lateral, joelhos semiflexionados e quadril encaixado. Segurar uma bola à frente do corpo com as duas mãos, flexionar o cotovelo para frente até tocar o ombro, sem soltar a bola; segurar por 10 segundos e estender até a posição inicial. Repetir por 10 a 15 vezes',
  },
  28: {
    id: 28,
    duration: 5 * 10,
    repeat: false,
    switchSide: false,
    rounds: 1,
    title: 'Flexão do tronco com bola',
    description:
      'Posição inicial: em pé, pernas levemente afastadas na lateral, joelhos semiflexionados e quadril encaixado. Segurar uma bola acima do corpo com as duas mãos, flexionar o tronco à frente, colocar a bola no chão, elevar o corpo, estendendo os braços acima da cabeça; repetir o exercício apanhando e elevando a bola. Repetir por 10 a 15 vezes',
  },
};
