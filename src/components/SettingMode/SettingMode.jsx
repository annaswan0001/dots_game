import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  FilledInput,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
//api
import { setWinner } from "../../api/api";
//state
import { GameContext } from "../../state/reducer";
import { actionsTypes } from "../../state/actionsTypes";
//utils
import { dateFormat } from "../../utils/dateFormat";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  input: {
    padding: "23px 12px 6px",
    minWidth: "145px",
    textAlign: "left"
  },
  label: {
    transform: "translate(12px, 18px) scale(1)",
  },
  button: {
    padding: "12px 50px",
    color: "#fff",
    backgroundColor: cyan[800],
    "&:hover": {
      backgroundColor: cyan[900],
    },
  },
  buttonDisabled: {
    backgroundColor: "#7B8D93 !important",
    color: "#fff !important",
  },
}));


const createField = (fieldSize) => {
  let fieldArr = [];
  for (let i = 0; i < fieldSize * fieldSize; i++) {
    let square = {
      id: i,
      isGreenSquare: false,
      isRedSquare: false,
      isBlueSquare: false,
      isAvailable: true,
      isDisabled: false,
    };
    fieldArr.push(square);
  }

  return fieldArr;
};

function SettingMode() {
  const classes = useStyles();
  const { state, dispatch } = useContext(GameContext);
  const [mode, setMode] = useState("");
  const [user, setUserName] = useState("");

  const {
    settings,
    isGameStart,
    size,
    field,
    delay,
    isGameFinish,
    winner,
  } = state;

  useEffect(() => {
    if (mode) {
      dispatch({type: actionsTypes.SET_FIELD_SIZE, payload: settings[mode].field})
      dispatch({type: actionsTypes.SET_GAME_DELAY, payload: settings[mode].delay})
      dispatch({ type: actionsTypes.SET_GAME_PERMISSION });
    }
  }, [mode, dispatch, settings]);

  useEffect(() => {
    if (size) {
      let fieldArray = createField(size)
      dispatch({ type: actionsTypes.SET_FIELD_ARRAY, payload: fieldArray });
    }
  }, [size, dispatch]);

  useEffect(() => {
    if (isGameStart && isGameFinish) {
      let fieldArray = createField(size);
      dispatch({ type: actionsTypes.SET_FIELD_ARRAY, payload: fieldArray });
      dispatch({ type: actionsTypes.SET_GAME_PERMISSION, payload: "" });
    }
  }, [isGameStart, size, isGameFinish, dispatch]);

  useEffect(() => {
    let interval;
    if (isGameStart && !isGameFinish) {
      let gameInterval = () => {
        let fieldCopy = [...field];
        let blueSquareArray = fieldCopy.filter((square) => {
          return square.isBlueSquare;
        });
        let greenSquareArray = fieldCopy.filter(
          (square) => square.isGreenSquare
        );
        let redSquareArray = fieldCopy.filter((square) => square.isRedSquare);
        let availableSquaresArray = fieldCopy.filter(
          (square) => square.isAvailable
        );

        if (blueSquareArray.length) {
          let currentSquare = blueSquareArray[0];
          fieldCopy[currentSquare.id].isBlueSquare = false;
          fieldCopy[currentSquare.id].isRedSquare = true;
          fieldCopy[currentSquare.id].isDisabled = true;
        }
        if (greenSquareArray.length === Math.round((size * size) / 2)) {
          clearInterval(gameInterval);
          dispatch({ type: actionsTypes.FINISH_GAME, payload: user });
        } else if (redSquareArray.length === Math.round((size * size) / 2)) {
          clearInterval(gameInterval);
          dispatch({ type: actionsTypes.FINISH_GAME, payload: "Computer" });
        } else {
          if (availableSquaresArray.length) {
            const randomIndex = Math.floor(
              Math.random() * availableSquaresArray.length
            );
            const randomSquare = availableSquaresArray[randomIndex];
            fieldCopy[randomSquare.id].isBlueSquare = true;
            fieldCopy[randomSquare.id].isRedSquare = false;
            fieldCopy[randomSquare.id].isAvailable = false;
          }

          dispatch({ type: actionsTypes.SET_FIELD_ARRAY, payload: fieldCopy });
        }
      };

      interval = setInterval(gameInterval, delay);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [isGameStart, isGameFinish, size, dispatch, user, delay, field]);

  useEffect(() => {
    if (isGameFinish) {
      let date = dateFormat();
      setWinner(winner, date).then((res) =>
        dispatch({ type: actionsTypes.SET_WINNERS, payload: res.data })
      );
    }
  }, [isGameFinish, dispatch, winner]);

  return (
    <>
      <Grid item lg={4}>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel classes={{ root: classes.label }} id="select-mode-label">
            Pick game mode
          </InputLabel>
          <Select
            input={<FilledInput classes={{ input: classes.input }} />}
            labelId="select-mode-label"
            id="select-mode"
            value={mode}
            label="Pick game mode"
            disabled={isGameStart}
            onChange={(e) => setMode(e.target.value)}
          >
            {state.settings &&
            Object.keys(state.settings).map((set, i) => (
              <MenuItem key={set} value={set}>
                {set}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={4}>
        <FormControl className={classes.formControl}>
          <TextField
            size="small"
            label="Enter your name"
            variant="filled"
            onChange={(e) => setUserName(e.target.value)}
            disabled={isGameStart}
            value={user}
          />
        </FormControl>
      </Grid>
      <Grid item container lg={4}>
        <Button
          // variant="contained"
          onClick={() => dispatch({ type: actionsTypes.START_GAME })}
          classes={{
            root: classes.button,
            disabled: classes.buttonDisabled,
            contained: classes.buttonDisabled,
          }}
          color="primary"
          className={classes.button}
          disabled={!mode || !user || isGameStart}
        >
          {isGameFinish ? "Play again" : "Play"}
        </Button>
      </Grid>
      <Grid item xs={12}>
      {winner && <h3 style={{ textAlign: "center" }}> {winner} win! </h3>}
      </Grid>
    </>
  );
}


export default SettingMode;
