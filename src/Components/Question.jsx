import React from 'react'
import Options from './Options'
import Timer from './Timer';
import { useQuiz } from '../contexts/QuizContext';
export default function Question() {
  const{dispatch,index,points,answer,questions}=useQuiz();
  const numQuestions=questions.length;
  const totalPoints=questions.reduce((prev,cur)=>prev+cur.points,0);
  const question=questions[index];
  return (
    <div>
      <header className='progress'>
        <progress max={numQuestions} value={index} />
        <p>Question <strong>{index+1}</strong>/{numQuestions}</p>
        <p>Points <strong>{points}</strong>/{totalPoints}</p>
      </header>
      <h4>{question.question}</h4>
      <Options />
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Timer/>
        <button className='btn btn-ui' 
              disabled={answer===null} 
              onClick={()=>{index+1===15?dispatch({type:'finished'}):dispatch({type:'nextClicked'});}}>
                {index+1===15?'Find out your score':'Next'}
        </button>
      </div>
    </div>
  )
}
