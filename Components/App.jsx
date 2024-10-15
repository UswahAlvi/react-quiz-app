
import { useReducer } from 'react';
import Header from './Header'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import MainComponent from './MainComponent'
import Question from './Question';
import { useEffect } from 'react';
import FinishScreen from './FinishScreen';

const SECONDS_PER_QUES=20;

const initialState={
  questions:[],
  //loading, ready, error, active, finished
  status:'loading',
  index:0,
  answer:null,
  points:0,
  secondsRemaining:null
}

export default function App() {

  function reducer(state, action){
    switch(action.type){
      case 'dataRecieved':
        return {...state, questions:action.payload, status:'ready'}
      case 'dataFailed':
        return {...state, status:'error'}
      case 'getStarted':
        return {...state, 
          status:'active',
          secondsRemaining:state.questions.length*SECONDS_PER_QUES
        }
      case 'optionClicked':
        const question=state.questions.at(state.index);
        return {
          ...state,
          answer:action.payload,
          points:question.correctOption===action.payload? state.points+question.points:state.points
        }
      case 'nextClicked':
        return{
          ...state,
          index:state.index + 1,
          answer:null
        }
      case 'finished':
        return{
          ...state,
          status:'finished'
        }
      case 'restart':
        return{
          ...initialState,
          questions:state.questions,
          status:'active'
        }
      case 'tick':
        return{
          ...state,
          secondsRemaining:state.secondsRemaining-1,
          status:state.secondsRemaining===0?'finished':state.status
        }
      default:
        throw new Error("action unknown");
    }
  }

  const [{questions,status,index,answer,points,secondsRemaining}, dispatch]=useReducer(reducer,initialState);


  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((response)=>(response.json()))
    .then((data)=>(dispatch({type:'dataRecieved', payload:data})))
    .catch((error)=>(dispatch({type:'dataFailed'})));
  },[])

  
  const numQuestions=questions.length;

  const totalPoints=questions.reduce((prev,cur)=>prev+cur.points,0);

  return(
    <div className='app'>
      <Header />
      <MainComponent>
        {status==='loading' && <Loader />}
        {status==='error' && <Error />}
        {status==='ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status==='active' && <Question question={questions[index]} answer={answer} 
                                        dispatch={dispatch} index={index} 
                                        numQuestions={numQuestions}
                                        points={points}
                                        totalPoints={totalPoints}
                                        secondsRemaining={secondsRemaining}/>}
        {status==='finished' && <FinishScreen points={points} totalPoints={totalPoints} dispatch={dispatch} secondsRemaining={secondsRemaining}/>}
      </MainComponent>
    </div>
  )
}

