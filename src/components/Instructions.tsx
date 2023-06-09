import ScoreCard from "./ScoreCard";

export interface IInstructionProps {
  resetBoard: () => void;
}
const Instruction = ({ resetBoard }: IInstructionProps) => (
  <div style={{width: "230px" ,margin:"20px"}}>
    <h1>How to Play</h1>
    <h3>
    NOTE: Start the game by pressing <span>d</span>
    </h3>
    
    <h5> <span>w </span>  Move Up</h5>
        <h5>
          <span>a</span> Move Left
        </h5>
        <h5>
          <span>s</span> Move Down
        </h5>
        <h5>
          <span>d</span> Move Right
        </h5>
    
      
        <button onClick={() => resetBoard()}>Reset game</button>
      
    
    <ScoreCard />
  </div>
);

export default Instruction; 