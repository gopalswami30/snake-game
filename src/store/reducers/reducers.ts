import { DOWN, INCREASE_SNAKE, INCREASE_SNAKE_SPEED, INCREMENT_SCORE, LEFT, RESET, RESET_SCORE, RIGHT, SET_DIS_DIRECTION, UP } from "../../constant/constant";


interface ISnakeCoord {
    x: number;
    y: number;
    radius:number;
  }
  
  export interface IGlobalState {
    snake: ISnakeCoord[] | [];
    disallowedDirection: string;
    score: number;
    speed: number;
  }
  
  const globalState: IGlobalState = {
    //Postion of the entire snake
    snake: [
      { x: 580, y: 300,radius:10  },
      { x: 560, y: 300 ,radius:10 },
      { x: 540, y: 300 ,radius:10 },
      { x: 520, y: 300 ,radius:10 },
      { x: 500, y: 300 ,radius:10 },
    ],
    disallowedDirection: "",
    score: 0,
    speed:350
  };
 export const gameReducer = (state = globalState, action:any) => {
    switch (action.type) {
        case RIGHT:
            case LEFT:
            case UP:
            case DOWN: {
              
             let newSnake = [{
                x: state.snake[0].x + action.payload[0],
                y: state.snake[0].y + action.payload[1],
                radius:state.snake[0].radius
              }, ...state.snake];
              newSnake.pop();
            
              return {
                ...state,
                snake: newSnake,
              };
            }
            case SET_DIS_DIRECTION:
                return { ...state, disallowedDirection: action.payload };
             case INCREASE_SNAKE:{
                    const snakeLen = state.snake.length;
                    return {
                      ...state,
                      snake: [
                        ...state.snake,
                        {
                          x: state.snake[snakeLen - 1].x - 20,
                          y: state.snake[snakeLen - 1].y - 20,
                          radius: state.snake[0].radius
                        },
                      ],
                    };  }
                    case INCREMENT_SCORE:
                       
                        return {
                          ...state,
                          score: state.score + 1,
                        };   
                    case INCREASE_SNAKE_SPEED:
                        console.log("speed"+state.speed);
                        return {
                            ...state,
                            speed:state.speed-1
                        }
                        case RESET_SCORE:
      return { ...state, score: 0 }; 
      case RESET:
      return {
        ...state,
        snake: [
          { x: 580, y: 300 ,radius:10},
          { x: 560, y: 300 ,radius:10},
          { x: 540, y: 300 ,radius:10},
          { x: 520, y: 300 ,radius:10},
          { x: 500, y: 300 ,radius:10},
        ],
        disallowedDirection: "",
        score:0,
        speed:350
      };  
        default:
            return {...state,globalState};
            
        }
}

  