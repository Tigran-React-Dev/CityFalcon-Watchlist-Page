import React, { createContext, useContext,useState } from "react";


const GlobalContext =  createContext({});


const GlobalProvider = ({children})=>{

    const [initialTopicData,setInitialTopicData]=useState({
        autorefresh:[{id:1,time:"0.5",title:"30",selected:true},
                     {id:2,time:"1",title:"1",selected:false},
                     {id:3,time:"2",title:"2",selected:false}
                    ],
        orderby:[
            {id:1,type:"top",selected:true},
            {id:2,type:"latest",selected:false},
            {id:3,type:"retweeted",selected:false},
            {id:4,type:" read",selected:false},
        ],
        language:[
            {id:0,language:"All Selected",selected:true},
            {id:1,language:"en",selected:true},
            {id:2,language:"de",selected:true},
            {id:3,language:"zh",selected:true},
            {id:4,language:"it",selected:true},
        ]           
       });
   
   
       const [activeSelected,setActiveSelected]=useState({
        autorefresh:initialTopicData.autorefresh[0],
        orderby:initialTopicData.orderby[0],
        language:initialTopicData.language[0]})




    return <GlobalContext.Provider value={{
        initialTopicData,
        setInitialTopicData,
        activeSelected
    }}>
     {children}
    </GlobalContext.Provider>
}


const useGlobalProvider =()=>{
    return useContext(GlobalContext)
}

export {GlobalProvider,useGlobalProvider}
