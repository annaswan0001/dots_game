import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { GameContext } from "../../state/reducer";
import Cell from "./Cell";
import { actionsTypes } from "../../state/actionsTypes";

function GameField() {
  const { state, dispatch } = useContext(GameContext);
  const { size, field } = state;

  const handleCkickSquare = (index) => {

    const fieldCopy = [...field];
    
    if (fieldCopy[index].isBlueSquare) {
      fieldCopy[index].isBlueSquare = false;
      fieldCopy[index].isGreenSquare = true;
      fieldCopy[index].disabled = true;
      dispatch({ type: actionsTypes.CHANGE_SQUARE, payload: fieldCopy });
    }
  };

  const board = field.map((val, index) => {
    if ((index + 1) % size === 0) {
      return (
        <span key={val.id}>
          <Cell {...val} onClick={() => handleCkickSquare(index)} />
          <br />
        </span>
      );
    } else {
      return (
        <span key={val.id}>
          {<Cell {...val} onClick={() => handleCkickSquare(index)} />}
        </span>
      );
    }
  });

  return <Grid item>{board}</Grid>;
}

export default GameField;
