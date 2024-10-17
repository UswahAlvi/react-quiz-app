import React from 'react'
import { useQuiz } from '../contexts/QuizContext';

export default function () {
    const {dispatch,secondsRemaining,points,questions}=useQuiz();
    const totalPoints=questions.reduce((prev,cur)=>prev+cur.points,0);
    const per=(points/totalPoints)*100;
    const minutes=Math.floor(secondsRemaining/60);
    const seconds=secondsRemaining%60;
  return (<>
    <div className='result'>
        <p>You scored <strong>{points}</strong> out of {totalPoints} Points. ({Math.ceil(per)}%)</p>
    </div>
    <div className='result'>
    <p>Time that was remaining {minutes<10 && '0'}{minutes}:{seconds<10 && '0'}{seconds}</p>
    <button className='btn btn-ui' onClick={()=>{dispatch({type:'restart'})}}>Restart Quiz</button>
    </div>
    </>
  )
}
