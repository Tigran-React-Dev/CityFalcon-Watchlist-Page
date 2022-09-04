import React, { useEffect, useState } from "react";
import css from "../assets/styles/Filterbar.module.scss";
import { useGlobalProvider } from "./Provider/GlobalProvider";




const FilterBar =()=>{
   
   
   const {activeSelected,initialTopicData,setInitialTopicData}=useGlobalProvider()
  
    
    return (
        <div className={css.filterbar}>
           <div className={css.selectcontainer}>  
             <div className={css.autorefreshtopic}>

             </div>
             <div className={css.orderbytopic}>

             </div>
             <div className={css.languagetopic}>

             </div>
             <button className={css.refreshtopic}>Refresh</button>
             </div>

        </div>
    )
}


export default FilterBar;
