import React, { useState, useEffect, useContext, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import axios from "axios";
//api
import { getSettings, getWinners } from "./api/api";
//state
import { GameContext } from "./state/reducer";
import { actionsTypes } from "./state/actionsTypes";
//components
import GameField from "./components/GameField/GameField";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import SettingMode from "./components/SettingMode/SettingMode";
import Loader from "./components/Loader/Loader";

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

function Game() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { state, dispatch } = useContext(GameContext);
  const { winners } = state;

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
  }, [dispatch]);

  // LeaderBoardMemo should rerender only when winners list change
  const LeaderBoardMemo = useMemo(() => {
    return <LeaderBoard winners={winners} />;
  }, [winners]);

  return (
    <Container maxWidth="xl">
      <main>
        {isError ? "Something go wrong" : null}
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
              <SettingMode />
              <GameField />
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
