import React, { useEffect, useContext, useMemo, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import axios from "axios";
//error alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
//api
import { getSettings, getWinners, setWinner } from "./api/api";
//state
import { GameContext } from "./state/reducer";
import { actionsTypes } from "./state/actionsTypes";
//components
import GameField from "./components/GameField/GameField";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import SettingMode from "./components/SettingMode/SettingMode";
import Loader from "./components/Loader/Loader";
//utils
import { dateFormat } from "./utils/dateFormat";


//styles for MUI
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    padding: theme.spacing(1),
    border: "2px solid #E7E7E9",
    minHeight: "100vh",
    paddingTop: "10%",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
    },
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

function Game() {
  const classes = useStyles();
  const { state, dispatch } = useContext(GameContext);

  const {
    settings,
    isGameStart,
    size,
    field,
    delay,
    isGameFinish,
    winner,
    user,
    mode,
    winners,
    isLoading,
  } = state;

  //initial settings-data for game andleader board
  useEffect(() => {
    dispatch({ type: actionsTypes.REQUEST_DATA });
    axios
      .all([getSettings(), getWinners()])
      .then(
        axios.spread((...responses) => {
          const [settings, winners] = responses;
          dispatch({
            type: actionsTypes.SET_SETTINGS,
            payload: {
              settings: settings.data,
              winners: winners.data.reverse(),
            },
          });
        })
      )
      .catch((errors) => {
        dispatch({ type: actionsTypes.ERROR_DATA });
        Swal.fire({
          title: "Error!",
          text: "We are sorry! Something go wrong! Try later!",
          icon: "error",
          confirmButtonText: "Cool",
        });
      });
  }, [dispatch]);

  
   //handler for select mode
  const setGameMode = useCallback(
    (gameMode) => {
      dispatch({ type: actionsTypes.SET_MODE, payload: gameMode });
      if (isGameFinish) {
        dispatch({ type: actionsTypes.SET_GAME_PERMISSION });
      }
    },
    [dispatch, isGameFinish]
  );

  
  const handleCkickSquare = useCallback(
    (index) => {
      dispatch({ type: actionsTypes.CLICK_SQUARE, payload: index });
    },
    [dispatch]
  );


  useEffect(() => {
    if (size) {
      let fieldArray = createField(size);
      dispatch({ type: actionsTypes.SET_FIELD_ARRAY, payload: fieldArray });
    }
  }, [size, dispatch]);


  //create new field after finish previous game, clear results
  useEffect(() => {
    if (isGameStart && isGameFinish) {
      let fieldArray = createField(size);
      dispatch({ type: actionsTypes.SET_FIELD_ARRAY, payload: fieldArray });
      dispatch({ type: actionsTypes.SET_GAME_PERMISSION, payload: "" });
    }
  }, [isGameStart, size, isGameFinish, dispatch]);

  //set game inteval
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
          let currentSquareId = blueSquareArray[0].id;
          dispatch({
            type: actionsTypes.SET_SQUARE_RED,
            payload: currentSquareId,
          });
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
            const randomSquare = availableSquaresArray[randomIndex].id;
            dispatch({
              type: actionsTypes.SET_SQUARE_BLUE,
              payload: randomSquare,
            });
          }
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
      setWinner(winner, date)
        .then((res) =>
          dispatch({
            type: actionsTypes.SET_WINNERS,
            payload: res.data.reverse(),
          })
        )
        .catch(() => {
          Swal.fire({
            title: "Can't get winners!",
            text: "Try it later",
            icon: "error",
            confirmButtonText: "Cool",
          });
        });
    }
  }, [isGameFinish, dispatch, winner]);


//for all child use UseMemo for preventing unnessary rerendering
  const SettingModeMemo = useMemo(() => {
    return (
      <SettingMode
        settings={settings}
        setGameMode={setGameMode}
        mode={mode}
        isGameStart={isGameStart}
        isGameFinish={isGameFinish}
        dispatch={dispatch}
        user={user}
      />
    );
  }, [settings, setGameMode, mode, isGameStart, isGameFinish, user, dispatch]);

  const LeaderBoardMemo = useMemo(() => {
    return <LeaderBoard winners={winners} />;
  }, [winners]);

  const GameFieldMemo = useMemo(() => {
    return (
      <GameField
        size={size}
        field={field}
        handleCkickSquare={handleCkickSquare}
        dispatch={dispatch}
      />
    );
  }, [handleCkickSquare, dispatch, size, field]);

  return (
    <Container maxWidth="xl">
      <main>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid
            className={classes.mainGrid}
            container
            direction="row"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid
              justify="center"
              container
              item
              spacing={2}
              alignItems="flex-start"
              md={6}
            >
              {SettingModeMemo}

              <Grid item xs={12}>
                {winner && (
                  <h3> {winner} win! </h3>
                )}
              </Grid>
              {GameFieldMemo}
            </Grid>
            <Grid container alignItems="center" item md={6}>
              {LeaderBoardMemo}
            </Grid>
          </Grid>
        )}
      </main>
    </Container>
  );
}

export default Game;
