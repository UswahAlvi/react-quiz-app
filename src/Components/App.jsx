
import Header from './Header'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import MainComponent from './MainComponent'
import Question from './Question';
import { useEffect } from 'react';
import FinishScreen from './FinishScreen';
import { useQuiz } from '../contexts/QuizContext'



export default function App() {
  const {status,dispatch}=useQuiz();


  useEffect(function(){
    fetch("/questions.json")
    .then((response)=>(response.json()))
    .then((data)=>(dispatch({type:'dataRecieved', payload:data.questions})))
    .catch(()=>(dispatch({type:'dataFailed'})));
  },[])

  return(
    <div className='app'>
      <Header />
      <MainComponent>
        {status==='loading' && <Loader />}
        {status==='error' && <Error />}
        {status==='ready' && <StartScreen/>}
        {status==='active' && <Question />}
        {status==='finished' && <FinishScreen />}
      </MainComponent>
    </div>
  )
}

