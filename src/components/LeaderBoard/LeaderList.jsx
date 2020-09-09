import React from "react";
import PropTypes from 'prop-types'

function LeaderList({ winner }) {
  return (
    <div className="leaders_item">
      <div className="leaders_item-row">
        <p> {winner.winner}</p>
        <p>{winner.date}</p>
      </div>
    </div>
  );
}


LeaderList.propTypes = {
  winners: PropTypes.string
};

export default LeaderList 

