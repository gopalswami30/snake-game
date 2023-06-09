
import {SET_DIS_DIRECTION,RESET,STOP_GAME,INCREASE_SNAKE, INCREMENT_SCORE, INCREASE_SNAKE_SPEED} from '../../constant/constant';
export interface ISnakeCoord {
  x: number;
  y: number;
  speed:number;
}
export const makeMove = (dx: number, dy: number, move: string) => ({
  type: move,
  payload: [dx, dy]
});

export const setDisDirection = (direction: string) => ({
  type: SET_DIS_DIRECTION,
  payload: direction
});

export const resetGame = () => ({
  type: RESET
});

export const stopGame = () => ({
  type: STOP_GAME
});

export const increaseSnake = () => ({
  type: INCREASE_SNAKE
});
export const increaseSnakeSpeed = () => ({
  type: INCREASE_SNAKE_SPEED
});
export const scoreUpdates = (score: number) => ({
  type:INCREMENT_SCORE,
  payload:score
});