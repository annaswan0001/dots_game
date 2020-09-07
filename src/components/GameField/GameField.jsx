import React, {useContext} from "react";
import { Grid,  } from "@material-ui/core";
import {GameContext} from '../../state/reducer'
import Cell from "./Cell";


function GameField() {

  const { state, dispatch } = useContext(GameContext);
  const {size, field} = state 
  
  const onClick = ()=>{}

  const board = field.map((val, index) => {
    if ((index + 1) % size === 0) {
      return (
        <span key={val.id}>
          <Cell
            value={val}
            {...val}
              onClick={() => onClick(index)}
          />
          <br />
        </span>
      );
    } else {
      return (
        <span key={val.id}>
          {
            <Cell
              {...val}
              onClick={() => onClick(index)}
              value={val}
            />
          }
        </span>
      );
    }
  });

  return    <Grid item >{board}</Grid>
}

export default GameField








