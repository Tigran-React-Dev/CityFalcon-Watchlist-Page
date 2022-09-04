import React, { createContext, useContext,useState } from "react";
import axios from "axios"

const GlobalContext =  createContext({});


const GlobalProvider = ({children})=>{
    const [stories, setStories] = useState([])
    const [initialTopicData,setInitialTopicData]=useState({
        autorefresh:[{id:1,time:"30",title:"30 sec",selected:true},
                     {id:2,time:"100",title:"1 min",selected:false},
                     {id:3,time:"200",title:"2 min ",selected:false},
                     {id:4,time:"1000",title:"10 min ",selected:false},
                    ],
        orderby:[
            {id:1,type:"top",selected:true},
            {id:2,type:"latest",selected:false},
            {id:3,type:"retweeted",selected:false},
            {id:4,type:" read",selected:false},
        ],
        language:[
            {id:0,key:"All Selected",selected:true},
            {id:1,key:"en",selected:true},
            {id:2,key:"de",selected:true},
            {id:3,key:"zh",selected:true},
            {id:4,key:"it",selected:true},
        ]           
       });
   
   
       const [activeSelected,setActiveSelected]=useState({
        autorefresh:initialTopicData.autorefresh[0],
        orderby:initialTopicData.orderby[0],
        language:initialTopicData.language[0]})
        const [query,setQuery]=useState({
            language:"",
            orderby:""
        });
    const ChangeCheckboxStatus =(id,checked,type)=>{
        if(type=="autorefresh"){
            let newautorefresh = initialTopicData.autorefresh.map((elem)=>{
                if(elem.id==id){
                    return {
                        ...elem,
                        selected:checked
                    }
                }else{
                    return {
                        ...elem,
                    selected:false
                    }
                }
            })
            setInitialTopicData({
                ...initialTopicData,
                autorefresh:newautorefresh
            })
            setActiveSelected({
                ...activeSelected,
                autorefresh:newautorefresh.find((item)=>item.id==id)
            })
        }else if(type=="orderby"){
            let newOrderBy = initialTopicData.orderby.map((elem)=>{
                if(elem.id==id){
                    return {
                        ...elem,
                        selected:checked
                    }
                }else{
                    return {
                        ...elem,
                    selected:false
                    }
                }
            })
            setInitialTopicData({
                ...initialTopicData,
                orderby:newOrderBy
            })
            setActiveSelected({
                ...activeSelected,
                orderby:newOrderBy.find((item)=>item.id==id)
            })
        }else if(type=="language"){
            let newLanguage=[];
            if(id==0){
                if(checked){
                    newLanguage = initialTopicData.language.map((elem)=>{
                        return {
                                ...elem,
                                selected:true
                            }
                     })
                }else{
                    newLanguage = initialTopicData.language.map((elem)=>{
                        return {
                                ...elem,
                                selected:false
                            }
                     })
                }
            }else{
                newLanguage = initialTopicData.language.map((elem)=>{
                    if(elem.id==0){
                        return {
                            ...elem,
                            selected:false
                        } 
                    }else if(elem.id==id){
                        return {
                            ...elem,
                            selected:checked
                        }
                    }else{
                        return elem
                    }
                 })
            }
       

            setInitialTopicData({
                ...initialTopicData,
                language:newLanguage
            })
            setActiveSelected({
                ...activeSelected,
                language:newLanguage.find((item)=>item.id==id)
            })           
        }
       
    }


    const CustomRefresh = async ()=>{
        const response = await axios.get(`https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories?limit=${10}&languages=${query.language}&order=${query.orderby}&page_token=98807224-712f-4658-9d31-98f77773333`)
        console.log(response,"resss");
        setStories([...response.data.stories])
    }




    return <GlobalContext.Provider value={{
        initialTopicData,
        setInitialTopicData,
        activeSelected,
        ChangeCheckboxStatus,
        query,
        setQuery,
        stories, 
        setStories,
        CustomRefresh
    }}>
     {children}
    </GlobalContext.Provider>
}


const useGlobalProvider =()=>{
    return useContext(GlobalContext)
}

export {GlobalProvider,useGlobalProvider}
