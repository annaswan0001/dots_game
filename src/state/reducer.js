import React from "react";
import { actionsTypes } from "./actionsTypes";

export const GameContext = React.createContext({
  settings: null,
  field: [],
  delay: null,
  size: null,
  isGameStart: false,
  isGameFinish: false,
  winners: null,
  winner: "",
});

function reducer(state, action) {
  switch (action.type) {
    case actionsTypes.SET_SETTINGS: {
      return { ...state, settings: action.payload };
    }
    case actionsTypes.SET_GAME_DELAY: {
      return { ...state, delay: action.payload };
    }
    case actionsTypes.SET_FIELD_SIZE: {
      return { ...state, size: action.payload };
    }
    case actionsTypes.SET_WINNERS: {
      return { ...state, winners: action.payload };
    }
    case actionsTypes.SET_FIELD_ARRAY: {
      return { ...state, field: action.payload };
    }
    case actionsTypes.START_GAME: {
      return { ...state, isGameStart: true };
    }
    case actionsTypes.FINISH_GAME: {
      return {
        ...state,
        isGameFinish: true,
        isGameStart: false,
        winner: action.payload,
      };
    }
    case actionsTypes.SET_GAME_PERMISSION: {
      return {
        ...state,
        isGameFinish: false,
        winner: "",
      };
    }
    case actionsTypes.CLICK_SQUARE: {
      if (state.field[action.payload].isBlueSquare) {
        return {
          ...state,
          field: state.field.map((square, index) =>
            index === action.payload
              ? {
                  ...square,
                  isBlueSquare: false,
                  isGreenSquare: true,
                  disabled: true,
                }
              : square
          ),
        };
      } else {
        return state;
      }
    }
    case actionsTypes.SET_SQUARE_RED: {
      return {
        ...state,
        field: state.field.map((square) =>
          square.id === action.payload
            ? {
                ...square,
                isBlueSquare: false,
                isRedSquare: true,
                isDisabled: true,
              }
            : square
        ),
      };
    }
    case actionsTypes.SET_SQUARE_BLUE: {
      return {
        ...state,
        field: state.field.map((square) =>
          square.id === action.payload
            ? {
                ...square,
                isBlueSquare: true,
                isRedSquare: false,
                isAvailable: false,
              }
            : square
        ),
      };
    }
    default: {
      throw new Error();
    }
  }
}
export default reducer;
