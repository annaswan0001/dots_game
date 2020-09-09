import React, { useContext, useCallback } from "react";
import { Grid } from "@material-ui/core";
//state
import { GameContext } from "../../state/reducer";
import { actionsTypes } from "../../state/actionsTypes";
//components
import Cell from "./Cell";

function GameField() {
  const { state, dispatch } = useContext(GameContext);
  const { size, field } = state;

  const handleCkickSquare = useCallback(
    (index) => {
      dispatch({ type: actionsTypes.CLICK_SQUARE, payload: index });
    },
    [dispatch]
  );

  const board = field.map((val, index) => {
    if ((index + 1) % size === 0) {
      return (
        <React.Fragment key={val.id}>
          <Cell
            key={val.id}
            {...val}
            size={size}
            onClick={() => handleCkickSquare(index)}
          />
          <p />
        </React.Fragment>
      );
    } else {
      return (
        <Cell
          size={size}
          key={val.id}
          {...val}
          onClick={() => handleCkickSquare(index)}
        />
      );
    }
  });

  return (
    <Grid item>
      <div>{board}</div>
    </Grid>
  );
}

export default GameField;
