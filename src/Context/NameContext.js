import { createContext, useState } from "react";

export let NameContext = createContext();
export function NameContextProvider(props){

    let [name,setName]=useState("aa");

    function changeName(name){
        setName(name);
        // console.log("ssss")
    }
    return <NameContext.Provider value={{name,changeName}}>
        {props.children}
    </NameContext.Provider>
}


// export function CounterContextProvider(props){
//     let [count ,setCount] = useState(0);
//     function changecount(){
//         setCount(Math.random()*10);
//       }
//   return  <CounterContext.Provider value={{count,changecount}}>
//             {props.children}   
//     </CounterContext.Provider>
// }