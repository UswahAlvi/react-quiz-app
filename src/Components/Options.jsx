import React from 'react'
import { useQuiz } from '../contexts/QuizContext';

export default function Options() {
    const {questions,index,dispatch,answer}=useQuiz();
    const question=questions[index];
    const hasAnswered=answer!==null;
  return (
    <div className='options'>
          {question.options.map(
            (option,index)=>{
              return<button className={`btn btn-option ${index===answer? 'answer':''}
                                                        ${hasAnswered?index==question.correctOption?'correct':'wrong':''}`}
                      key={option}
                      disabled={hasAnswered}
                      onClick={()=>{dispatch({type:'optionClicked',payload:index})}}>
                      {option}
                    </button>
              }
            )
          }
      </div>
  )
}
