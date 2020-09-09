import React, { useContext, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//state
import { GameContext } from "../../state/reducer";
import { actionsTypes } from "../../state/actionsTypes";
//components
import Cell from "./Cell";


const useStyles = makeStyles((theme) => ({
center: {
    margin: "0 auto",
  },
}));

function GameField() {
  const { state, dispatch } = useContext(GameContext);
  const { size, field } = state;
  const classes = useStyles();
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
    <Grid   classes={{item: classes.center}} item>
      <div >{board}</div>
    </Grid>
  );
}

export default GameField;
