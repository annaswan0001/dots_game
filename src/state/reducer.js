
import React from "react";
import {actionsTypes} from './actionsTypes'

export const GameContext = React.createContext({
    settings:null,
    field:[],
    delay:null, 
    size:null, 
    IsGameStart:false,
    IsGameFinish:false,
    winners:null,
});

function reducer(state, action) {

    switch (action.type) {
      case actionsTypes.SET_SETTINGS:{
        return {...state, settings:action.payload}
      }
      case actionsTypes.SET_GAME_DELAY:{
        return {...state, delay: action.payload}
      }
      case actionsTypes.SET_FIELD_SIZE:{
        return {...state, size: action.payload}
      }
      case actionsTypes.SET_WINNERS:{
        return {...state, winners: action.payload}
      }
      case actionsTypes.SET_FIELD_ARRAY:{
        return {...state, field: action.payload}
      }
      case actionsTypes.START_GAME:{
        return {...state, gameIsStart:true }
      }
      default:
        throw new Error();
    }
  }

  export default reducer