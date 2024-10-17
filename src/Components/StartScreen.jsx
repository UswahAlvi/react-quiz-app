import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

export default function StartScreen() {
  const {questions,dispatch}=useQuiz();
  return(
  <div className='start'>
    <h2>Welcome to the react quiz</h2>
    <h3>{questions.length} questions to test your react mastery</h3>
    <button className='btn btn-ui' onClick={()=>{dispatch({type:'getStarted'})}}>Let's Start</button>
  </div>
  )
}
