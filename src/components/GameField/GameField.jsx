import React, {
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
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
  const [isDesktop, setDesktop] = useState(window.innerWidth > 576);
  const classes = useStyles();

  const updateMedia = () => {
    setDesktop(window.innerWidth > 576);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const handleCkickSquare = useCallback(
    (index) => {
      dispatch({ type: actionsTypes.CLICK_SQUARE, payload: index });
    },
    [dispatch]
  );

  const boardStandart = useMemo(
    () =>
      field.map((val, index) => {
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
      }),
    [field, size, handleCkickSquare]
  );

  const boardSmallDevice = useMemo(
    () =>
      field.map((val, index) => {
        return (
          <React.Fragment key={val.id}>
            <Cell
              key={val.id}
              {...val}
              size={size}
              onClick={() => handleCkickSquare(index)}
            />
          </React.Fragment>
        );
      }),
    [field, handleCkickSquare, size]
  );

  let renderBoard = useMemo(() => {
    if (!isDesktop && size === 15) {
      return boardSmallDevice;
    } else return boardStandart;
  }, [isDesktop, size, boardSmallDevice, boardStandart]);

  return (
    <Grid classes={{ item: classes.center }} item>
      <div> {renderBoard}</div>
    </Grid>
  );
}

export default GameField;
