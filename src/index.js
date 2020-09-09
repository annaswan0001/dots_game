import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

//context/reducer
import { GameContext } from "./state/reducer";
import reducer from "./state/reducer";
//component
import Game from "./Game";

const App = () => {
  const initialState = useContext(GameContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <Game />
    </GameContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
