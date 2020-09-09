import React from "react";
import './Cell.scss'
import cn from "classnames";
import PropTypes from 'prop-types'

const Cell = ({ isGreenSquare, isRedSquare, isBlueSquare, onClick, size }) => {
  
  let btnClass = cn({
     btn: true,
    "btn-blue": isBlueSquare,
    "btn-red": isRedSquare,
    "btn-green": isGreenSquare,
    "btn-small": size === 5,
    "btn-medium":size===10,
    "btn-large":size===15
  });

  return <button onClick={onClick} className={btnClass}></button>;
};

Cell.propTypes = {
  isGreenSquare: PropTypes.bool,
  isRedSquare : PropTypes.bool, 
  isBlueSquare : PropTypes.bool,
  onClick: PropTypes.func,
  size:PropTypes.number
};

export default Cell;
