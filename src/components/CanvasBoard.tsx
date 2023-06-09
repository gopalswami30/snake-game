import React , { useCallback, useEffect, useRef, useState } from "react";
import { IObjectBody, clearBoard, drawObject, generateRandomPosition, hasSnakeCollided, randomRadius}  from '../utilities/index';
import { useDispatch, useSelector } from "react-redux";
import { IGlobalState } from "../store/reducers/reducers";
import { increaseSnake, increaseSnakeSpeed, makeMove, resetGame, scoreUpdates, stopGame } from "../store/actions/action";
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from "../constant/constant";
import Instruction from "./Instructions";

export interface ICanvasBoard {
  height: number;
  width: number;
}

const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  
  const dispatch = useDispatch();
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const canvasRef = useRef < HTMLCanvasElement | null > (null);
  const [context, setContext] =
    useState < CanvasRenderingContext2D |null >( null);
    const disallowedDirection = useSelector(
      (state: IGlobalState) => state.disallowedDirection
    );
    const snake1 = useSelector((state: IGlobalState) => state.snake);
	 const [pos, setPos] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20,15)
   );
   const [isConsumed, setIsConsumed] = useState<boolean>(false);
   const [ranRadius, setRanRadius] = useState<number>(1);
  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
        if (dx > 0 && dy === 0 && ds !== "RIGHT") {
          
            dispatch(makeMove(dx, dy, MOVE_RIGHT));
        }

        if (dx < 0 && dy === 0 && ds !== "LEFT") {
            dispatch(makeMove(dx, dy, MOVE_LEFT));
        }

        if (dx === 0 && dy < 0 && ds !== "UP") {
            dispatch(makeMove(dx, dy, MOVE_UP));
        }

        if (dx === 0 && dy > 0 && ds !== "DOWN") {
            dispatch(makeMove(dx, dy, MOVE_DOWN));
        }
    },
    [dispatch]
);

const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
        if (disallowedDirection) {
          
            switch (event.key) {
                case "w":
                 
                    moveSnake(0, -20, disallowedDirection);
                    break;
                case "s":
                    moveSnake(0, 20, disallowedDirection);
                    break;
                case "a":
                    moveSnake(-20, 0, disallowedDirection);
                    break;
                case "d":
                    event.preventDefault();
                    moveSnake(20, 0, disallowedDirection);
                    break;
            }
        } else {
            if (
                disallowedDirection !== "LEFT" &&
                disallowedDirection !== "UP" &&
                disallowedDirection !== "DOWN" &&
                event.key === "d"
            ){ 
                moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
              }
        }
    },
    [disallowedDirection, moveSnake]
);
const resetBoard = useCallback(() => {
  window.removeEventListener("keypress", handleKeyEvents);
  dispatch(resetGame());
 
  clearBoard(context);
  drawObject(context, snake1, "#91C483");
  drawObject(
    context,
    [generateRandomPosition(width - 20, height - 20,10)],
    "#676FA3"
  ); //Draws object randomly
  window.addEventListener("keypress", handleKeyEvents);
}, [context, dispatch, handleKeyEvents, height, snake1, width]);
useEffect(() => {
  window.addEventListener("keypress", handleKeyEvents);

  return () => {
      window.removeEventListener("keypress", handleKeyEvents);
  };
}, [disallowedDirection, handleKeyEvents]);
useEffect(()=>{
  if (isConsumed) {
   
    
    const posi = generateRandomPosition(width - 20, height - 20,ranRadius);
    setPos(posi);
    setIsConsumed(false);
 //Increment the score
 dispatch(scoreUpdates(ranRadius%10));
    //Increase snake size when object is consumed successfully
    dispatch(increaseSnake());
    dispatch(increaseSnakeSpeed());
   
  }
},[isConsumed,pos, height, width,dispatch]);
useEffect(()=>{
  if (isConsumed) {
    setRanRadius(randomRadius(10,19));
  }

},[isConsumed]);
    useEffect(() => {
      //Draw on canvas each time
      setContext(canvasRef.current && canvasRef.current.getContext("2d")); //store in state variable
      clearBoard(context);
      if(gameEnded)
      drawObject(context, snake1, "#ff0000");
      else
      drawObject(context, snake1, "#91C483");
      drawObject(context, [pos], "#676FA3"); //Draws fruit randomly
      if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
        setIsConsumed(true);
      }
      if (
        hasSnakeCollided(snake1, snake1[0]) ||
        snake1[0].x >= width ||
        snake1[0].x <= 0 ||
        snake1[0].y <= 0 ||
        snake1[0].y >= height
      ) {
        setGameEnded(true);
        dispatch(stopGame());
        window.removeEventListener("keypress", handleKeyEvents);
      } else setGameEnded(false);
    }, [context,pos, snake1,height, width, dispatch, handleKeyEvents,gameEnded]);
  return (
   <div style={{
   display:"flex"
  }}>
    <canvas
    ref={canvasRef}
      style={{
        border: `3px solid ${gameEnded ? "red" : "green"}`,
      }}
      height={height}
      width={width}
    />
    <Instruction resetBoard={resetBoard} />
    </div>
  );
 
};
export default CanvasBoard;


