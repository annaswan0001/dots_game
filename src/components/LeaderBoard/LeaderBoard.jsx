import React , {useContext}from 'react'
import PropTypes from 'prop-types'
import {GameContext} from '../../state/reducer'
function LeaderBoard() {

    const { state, dispatch } = useContext(GameContext);

    return (
        <div>
            <h2>Leader board</h2>
            {state.winners && state.winners.map((winner, i)=>{
                if(winner.winner)
                 return <div key={winner.id}> 
                     <span  >{winner.winner}</span>
                     <span  >{winner.date}</span>
                 </div>
            })}
        </div>
    )
}

LeaderBoard.propTypes = {

}

export default LeaderBoard

