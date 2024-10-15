import React from 'react'
import { useEffect } from 'react';

export default function ({secondsRemaining,dispatch}) {
    const minutes=Math.floor(secondsRemaining/60);
    const seconds=secondsRemaining%60;
    useEffect(()=>{
        const id=setInterval(()=>{
            dispatch({type:'tick'});
        },1000)
        return ()=>clearInterval(id);
    },[secondsRemaining])
  return (
    <div className='timer'>
        {minutes<10 && '0'}{minutes}:{seconds<10 && '0'}{seconds}
    </div>
  )
}
