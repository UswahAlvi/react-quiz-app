import { createContext, useContext, useReducer } from "react";

const SECONDS_PER_QUES=20;
const QuizContext=createContext();
const initialState={
    questions:[],
    //loading, ready, error, active, finished
    status:'loading',
    index:0,
    answer:null,
    points:0,
    secondsRemaining:null
  }
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
function QuizProvider({children}){
    const [{questions,status,index,answer,points,secondsRemaining}, dispatch]=useReducer(reducer,initialState);
    return<QuizContext.Provider value={{
        questions,status,index,answer,points,secondsRemaining,dispatch
    }}>
        {children}
    </QuizContext.Provider>
}
function useQuiz(){
    const context=useContext(QuizContext);
    if(context===undefined) throw new Error('context being used outside provider');
    return context;
}

export {QuizProvider,useQuiz}