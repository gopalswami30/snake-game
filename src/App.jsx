import CanvasBoard from './components/CanvasBoard.tsx';
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
       
          <h1 style={{"padding-left": "400px","font-size":"25px" , "margin-top":"10px","margin-bottom":"10px"}} >SNAKE GAME</h1>
          
          <CanvasBoard height={600} width={1100} />
          
   </Provider>
  );
};

export default App;