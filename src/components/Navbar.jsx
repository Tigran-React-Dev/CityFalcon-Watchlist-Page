import React, { useCallback, useState } from "react";
import css from "../assets/styles/Navbar.module.scss";
import FilterBar from "../components/FilterBar"


const  Navbar = ()=>{

    const [showFilterbar,setShowfilterbar]=useState(false);
    
    const ShowFilter =useCallback(()=>{
        setShowfilterbar(!showFilterbar)
    },[showFilterbar])


    return (
         <div className={css.navbar}>
            <h1>Watchlist Name</h1>
            <div className={css.controlebuttons}>
                 <button 
                        className={css.refreshbutton}
                        onClick={()=>{
                            setShowfilterbar(false)
                        }}      
                 >
                            Refresh
                  </button>
                 <button 
                        style={{backgroundColor:showFilterbar &&  "#eee"}}
                        className={css.filterbutton}
                        onClick={()=>ShowFilter()}
                        >
                            
                            Filter
                  </button>      
            </div>
            {showFilterbar ? <FilterBar/> : null}
        </div>
    )
}

export default Navbar;