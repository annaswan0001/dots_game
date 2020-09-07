import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import "./App.css";
import GameField from "./components/GameField/GameField";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import SettingMode from "./components/SettingMode/SettingMode";
import axios from "axios";
import { getSettings, getWinners } from "./api/api";
import { GameContext } from "./state/reducer";
import { actionsTypes } from "./state/actionsTypes";

const createField = (fieldSize) => {
  let fieldArr = [];
  for (let i = 0; i < fieldSize * fieldSize; i++) {
    let square = {
      isGreenSquare: false,
      isRedSquare: false,
      isBlueSquare: false,
      availableSquares: [],
      disabledSquares: [],
    };
    fieldArr.push(square);
  }
  
  return fieldArr;
};

const useStyles = makeStyles((theme) => ({
  container: {},
  mainGrid: {
    padding: theme.spacing(6),
    border: "2px solid #E7E7E9",
    minHeight: "100vh",
    paddingTop: "10%",
  },
}));

function Game() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { state, dispatch } = useContext(GameContext);
  const { gameIsStart, size } = state;

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    axios
      .all([getSettings(), getWinners()])
      .then(
        axios.spread((...responses) => {
          const [settings, winners] = responses;
          dispatch({ type: actionsTypes.SET_SETTINGS, payload: settings.data });
          dispatch({ type: actionsTypes.SET_WINNERS, payload: winners.data });
        })
      )
      .catch((errors) => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);


  useEffect(() => {
    if (size) {
      let fieldArray = createField(size);
      dispatch({ type: actionsTypes.SET_FIELD_ARRAY, payload: fieldArray });
    }
  }, [size, createField]);


  useEffect(() => {
    if (gameIsStart) {
      let fieldArray = createField(size);
      dispatch({ type: actionsTypes.SET_FIELD_ARRAY, payload: fieldArray });
    }
  }, [size, createField]);
  


  return (
    <Container className={classes.container} maxWidth="xl">
      <main>
        {console.log(state)}
        <Grid
          className={classes.mainGrid}
          container
          direction="row"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid container item spacing={2} alignItems="start" sm={6}>
            <SettingMode />
            <GameField />
          </Grid>
          <Grid container alignItems="center" item sm={6}>
            <LeaderBoard />
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default Game;
