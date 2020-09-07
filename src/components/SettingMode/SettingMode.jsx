import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
} from "@material-ui/core";
import {GameContext} from '../../state/reducer'
import {actionsTypes} from '../../state/actionsTypes'


import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#7B8D93",
    marginBottom: "0px",
    padding:"4px",
    margin:"0px"
  },
  select: {
    backgroundColor: "#CFD8DC",
  },
  input: {
    backgroundColor: "#F3F3F3",
  },
}));


let set ={"easyMode":{"field":3,"delay":2000},"normalMode":{"field":10,"delay":1000},"hardMode":{"field":15,"delay":900}}

function SettingMode() {
  const classes = useStyles();
  const { state, dispatch } = useContext(GameContext);
  const [mode, setMode] = useState("")
  const [user, setUserName] = useState("")
  const {gameIsStart, settings} = state;

  useEffect(() => {
    if(mode){
      // dispatch({type: actionsTypes.SET_FIELD_SIZE, payload: settings[mode].field})
      // dispatch({type: actionsTypes.SET_GAME_DELAY, payload: settings[mode].delay})
      dispatch({type: actionsTypes.SET_FIELD_SIZE, payload: set[mode].field})
      dispatch({type: actionsTypes.SET_GAME_DELAY, payload: set[mode].delay})
    }
  }, [mode])


  useEffect(() => {
    if(gameIsStart){
      dispatch({type: actionsTypes.START_GAME})
    }
  }, [gameIsStart])


  return (
    <>
      <Grid item lg={4}>
        <Select
          className={classes.select}
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          disabled={gameIsStart}
          onChange={(e) =>setMode(e.target.value)}
        >

          {/* {state.settings &&
            Object.keys(state.settings).map((set, i) => (
              <MenuItem key={set} value={set}>
                {set}
              </MenuItem>
            ))} */}

          {
            Object.keys(set).map((set, i) => (
              <MenuItem key={set} value={set}>
                {set}
              </MenuItem>
            ))}

        </Select>
      </Grid>
      <Grid item lg={4}>
        <TextField
          onChange={(e) => setUserName(e.target.value)}
          className={classes.input}
          fullWidth
          disabled={gameIsStart}
          value={user}
        />
      </Grid>
      <Grid item lg={4}>
        <Button
          onClick={()=>dispatch({type:actionsTypes.START_GAME})}
          size="large"
          color="primary"
          className={classes.button}
          disabled={state.gameIsStart || (!mode || !user)}
        >
          Play
        </Button>
      </Grid>
    </>
  );
}

SettingMode.propTypes = {};

export default SettingMode;
