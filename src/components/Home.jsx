import React, { useEffect, useState } from "react";
import css from "../assets/styles/Homepage.module.scss";
import { useGlobalProvider } from "./Provider/GlobalProvider";





const HomePage =()=>{


    const {initialTopicData}=useGlobalProvider();
    const {autorefresh,orderby,language}=initialTopicData;
    const [query,setQuery]=useState({
        language:"",
        orderby:""
    })

    useEffect(()=>{
        let activeordertype= orderby.find((item)=>item.selected);
        let activeLanguage = language.filter((item,i)=>i!=0 && item.selected);
        let lengkey = "";
          if(activeLanguage.length){
            
            activeLanguage.forEach(elem => {
                lengkey+=`${elem.key},`
            });
          }
        setQuery({
            language:lengkey,
            orderby:activeordertype ? activeordertype.type : ""
        })
        let activeautorefresh = autorefresh.find((item)=>item.selected);
        let refreshtimer =activeautorefresh ?  activeautorefresh.time*1000 : 0;

        setTimeout(()=>{
        
        },refreshtimer)

      
    },[autorefresh,orderby,language]);

    useEffect(()=>{
     console.log(query);
    },[query])



    return (
          <div>

         </div>
    )
}

export default HomePage;