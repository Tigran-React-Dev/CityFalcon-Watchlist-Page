import React, { useEffect, useState } from "react";
import css from "../assets/styles/Filterbar.module.scss";
import { useGlobalProvider } from "./Provider/GlobalProvider";

//import icons 
import chevronDown from "../assets/image/icon/chevron_down_icon.png"
import chevronUp from "../assets/image/icon/chevron_up_icon.png"


const FilterBar =()=>{
   
   
   const {activeSelected,initialTopicData,ChangeCheckboxStatus,CustomRefresh}=useGlobalProvider();
   const {autorefresh,orderby,language}=initialTopicData;
   const [showAndHideSelect,setShowAndHideSelect]=useState({1:false,2:false,3:false})
  
    
    return (
        <div className={css.filterbar}>
           <div className={css.selectcontainer}>  
             <div className={css.autorefreshtopic} onClick={()=>{
                setShowAndHideSelect({1:!showAndHideSelect["1"],2:false,3:false})
                
             }}>
                  <div className={css.selectetlable}>
                      <h2>{activeSelected.autorefresh.title}</h2>
                      <p>autorefresh</p>
                  </div>
                  {showAndHideSelect["1"] ? <img src={chevronUp} alt="chevronUp"/> : <img src={chevronDown}  alt="chevronDown"/>}
                  {showAndHideSelect["1"] && <div className={css.selectOpen} onClick={(e)=>e.stopPropagation()}> 
                       {autorefresh.map((elem)=>{
                        return <div key={elem.id} className={css.checketcoll}>
                               <input type="checkbox" checked={elem.selected} onChange={(e)=>{
                                        ChangeCheckboxStatus(elem.id,e.target.checked,"autorefresh")
                               }}/>
                                <p>{elem.title}</p>
                        </div>
                       })}
                       </div>
                   }
             </div>
             <div className={css.orderbytopic} onClick={()=>{
                setShowAndHideSelect({2:!showAndHideSelect["2"],1:false,3:false})
             }}>
                    <div className={css.selectetlable}>
                  <h2>{activeSelected.orderby.type}</h2>
                   <p>Order</p>
                   </div>
                   {showAndHideSelect["2"] ? <img src={chevronUp} alt="chevronUp"/> : <img src={chevronDown}  alt="chevronDown"/>}
                   {showAndHideSelect["2"] && <div className={css.selectOpen} onClick={(e)=>e.stopPropagation()}> 
                   {orderby.map((elem)=>{
                        return <div key={elem.id} className={css.checketcoll}>
                               <input type="checkbox" checked={elem.selected} onChange={(e)=>{
                                        ChangeCheckboxStatus(elem.id,e.target.checked,"orderby")
                               }}/>
                                <p>{elem.type}</p>
                        </div>
                       })}

                </div>}
             </div>
             <div className={css.languagetopic} onClick={()=>{
                setShowAndHideSelect({3:!showAndHideSelect["3"],1:false,2:false})
             }}>
                 <div className={css.selectetlable}>
                  <h2>{activeSelected.language.key}</h2>
                  <p>Languages</p>
                  </div>
                  {showAndHideSelect["3"] ? <img src={chevronUp} alt="chevronUp"/> : <img src={chevronDown}  alt="chevronDown"/>}
                  {showAndHideSelect["3"] && <div className={css.selectOpen} onClick={(e)=>e.stopPropagation()}> 
                  {language.map((elem)=>{
                        return <div key={elem.id} className={css.checketcoll}>
                               <input type="checkbox" checked={elem.selected} onChange={(e)=>{
                                        ChangeCheckboxStatus(elem.id,e.target.checked,"language")
                               }}/>
                                <p>{elem.key}</p>
                        </div>
                       })}

                </div>}
             </div>
             <button className={css.refreshtopic} onClick={CustomRefresh}>Refresh</button>
             </div>

        </div>
    )
}


export default FilterBar;
