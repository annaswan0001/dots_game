import React from "react";
import "./LeaderBoard.scss";
import LeaderList from "./LeaderList";
import PropTypes from 'prop-types'


const LeaderBoard = ({ winners }) => {

  return (
    <div className="leaders">
      <h1 className="leaders_title">Leader Board</h1>
      {winners &&
        winners.map((winner, i) => {
            return <LeaderList key={winner.id} winner={winner} />;
        })}
    </div>
  );
};

LeaderBoard.propTypes = {
    winners: PropTypes.arrayOf(PropTypes.object)
};

export default LeaderBoard;

