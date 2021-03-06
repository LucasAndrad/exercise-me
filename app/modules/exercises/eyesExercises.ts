import { EyesAnimationsNames } from './constants';

export const eyesExercises = {
  1: {
    id: 1,
    name: 'Piscar os olhos',
    description: 'Pisque os olhos 10 vezes, devagar.',
    duration: 10,
    hasAnimation: false,
  },
  2: {
    id: 2,
    name: 'Para cima e para baixo',
    description:
      'De olhos fechados, mova os olhos para cima e para baixo, igual a animação abaixo, sem pressa, durante 15 segundos.',
    duration: 15,
    hasAnimation: true,
    animationName: EyesAnimationsNames.UpDown,
  },
  3: {
    id: 3,
    name: 'Para direita e para a esquerda',
    description:
      'De olhos fechados, mova os olhos para direita e para a esquerda, igual a animação abaixo, sem pressa, durante 15 segundos.',
    duration: 15,
    hasAnimation: true,
    animationName: EyesAnimationsNames.LeftRight,
  },
  4: {
    id: 4,
    name: 'Sentido horário',
    description:
      'De olhos fechados, gire os olhos no sentido horário (ou anti horário se preferir), igual a animação abaixo, sem pressa, durante 15 segundos.',
    duration: 15,
    hasAnimation: true,
    animationName: EyesAnimationsNames.ClockWise,
  },
  5: {
    id: 5,
    name: 'Regra 20-20-20',
    description:
      'Olhe para um ponto fixo há pelo menos 20 metros longe de você, durante 20 segundos.',
    duration: 20,
    hasAnimation: false,
  },
};
