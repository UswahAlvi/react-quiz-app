import React from 'react'
import Options from './Options'
import Timer from './Timer';
export default function Question({question, answer, dispatch,numQuestions,index,points,totalPoints,secondsRemaining}) {
  return (
    <div>
      <header className='progress'>
        <progress max={numQuestions} value={index} />
        <p>Question <strong>{index+1}</strong>/{numQuestions}</p>
        <p>Points <strong>{points}</strong>/{totalPoints}</p>
      </header>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
        <button className='btn btn-ui' 
              disabled={answer===null} 
              onClick={()=>{index+1===15?dispatch({type:'finished'}):dispatch({type:'nextClicked'});}}>
                {index+1===15?'Find out your score':'Next'}
        </button>
      </div>
    </div>
  )
}
