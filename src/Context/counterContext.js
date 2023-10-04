import { createContext, useState } from "react";

export let CounterContext =createContext();

export function CounterContextProvider(props){
    let [count ,setCount] = useState(0);
    let [name,setName]=useState("ahmed");
    function changecount(){
        setCount(Math.random()*10);
      }
  return  <CounterContext.Provider value={{count,name,changecount}}>
            {props.children}   
    </CounterContext.Provider>
}