export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
      context.clearRect(0, 0, 1000, 600);
    }
  };

  export interface IObjectBody {
    x: number;
    y: number;
    radius:number;
  };
  
  

  export const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBody: IObjectBody[],
    fillColor: string,
    strokeStyle = "#146356"
  ) => {
    const drawCircle = (
      x: number,
      y: number,
      radius: number,
      fillColor: string,
      strokeStyle: string
    ) => {
      if(context){
      context?.beginPath();
      context?.arc(x, y, radius, 0, 2 * Math.PI);
      context?.closePath();
      context.fillStyle = fillColor;
      context?.fill();
      context.strokeStyle = strokeStyle;
      context?.stroke();}
    };
  
    if (context) {
      objectBody.forEach((object: IObjectBody) => {
        // For drawing a circle, you can modify the size or radius
        
  
        // Calculate the center coordinates for the circle
        const centerX = object.x + object.radius;
        const centerY = object.y + object.radius;
  
        drawCircle(centerX, centerY, object.radius, fillColor, strokeStyle);
      });
    }
  };
  

  const randomNumber=(min: number, max: number) =>{
    let random = Math.random() * max;
    return random - (random % 20);
  }
  export const generateRandomPosition = (width: number, height: number,radius:number) => {
    return {
      x: randomNumber(0, width),
      y: randomNumber(0, height),
      radius:radius
    };
  };
export const randomRadius=(min: number, max: number)=> {
 
  const randomNumber = Math.random();
  const range = max - min;
  const result = randomNumber * range + min;
  const roundedResult = Math.floor(result);

  return roundedResult;
}

  export const hasSnakeCollided = (
    snake: IObjectBody[],
    currentHeadPos: IObjectBody
  ) => {
    let flag = false;
    snake.forEach((pos: IObjectBody, index: number) => {
      if (
        pos.x === currentHeadPos.x &&
        pos.y === currentHeadPos.y &&
        index !== 0
      ) {
        flag = true;
      }
    });
  
    return flag;
  };