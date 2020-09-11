import React from "react";
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
import PropTypes from 'prop-types'
//state
import { actionsTypes } from "../../state/actionsTypes";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  input: {
    padding: "23px 12px 6px",
    minWidth: "145px",
    textAlign: "left",
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
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  buttonDisabled: {
    backgroundColor: "#7B8D93 !important",
    color: "#fff !important",
  },
}));

function SettingMode({
  setGameMode,
  settings,
  mode,
  isGameStart,
  isGameFinish,
  user,
  dispatch,
}) {
  const classes = useStyles();


  return (
    <>
      <Grid item xs={12} sm={6} lg={4}>
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
            onChange={(e) => setGameMode(e.target.value)}
          >
            {settings &&
              Object.keys(settings).map((set, i) => (
                <MenuItem key={set} value={set}>
                  {set}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6} item lg={4}>
        <FormControl className={classes.formControl}>
          <TextField
            error={user.length >= 10 ? true : false}
            size="small"
            label="Enter your name"
            variant="filled"
            onChange={(e) =>
              dispatch({ type: actionsTypes.SET_USER, payload: e.target.value })
            }
            disabled={isGameStart}
            value={user}
            helperText="Max 10 length"
          />
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6} md={12} item justify="center" container lg={4}>
        <Button
          onClick={() => dispatch({ type: actionsTypes.START_GAME })}
          classes={{
            root: classes.button,
            disabled: classes.buttonDisabled,
            contained: classes.buttonDisabled,
          }}
          color="primary"
          className={classes.button}
          disabled={!mode || !user || isGameStart || user.length >= 10}
        >
          {isGameFinish ? "Play again" : "Play"}
        </Button>
      </Grid>
    </>
  );
}

SettingMode.propTypes = {
  setGameMode : PropTypes.func,
  settings: PropTypes.shape({
    field: PropTypes.string,
    delay: PropTypes.number
  }),
  mode:PropTypes.string,
  isGameStart:PropTypes.bool,
  isGameFinish:PropTypes.bool,
  user:PropTypes.string,
  dispatch:PropTypes.func,
};

export default SettingMode;
