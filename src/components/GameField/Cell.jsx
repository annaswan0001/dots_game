import React from "react";
import './Cell.css'
import cn from "classnames";

const Cell = ({ isGreenSquare, isRedSquare, isBlueSquare, onClick }) => {
  
  let btnClass = cn({
     btn: true,
    "btn-blue": isBlueSquare,
    "btn-red": isRedSquare,
    "btn-green": isGreenSquare,
  });

  return <button onClick={onClick} className={btnClass}></button>;
};

export default Cell;
