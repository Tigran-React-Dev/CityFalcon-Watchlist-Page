import React, { useEffect, useState,useRef } from "react";
import css from "../assets/styles/Homepage.module.scss";
import { useGlobalProvider } from "./Provider/GlobalProvider";
import axios from "axios"
import { useHistory } from "react-router-dom";




const HomePage =()=>{

    const history = useHistory()
    const {initialTopicData,
           query,
           setQuery,
           stories, 
           setStories,
           limit, 
           setLimit}=useGlobalProvider();
    const {autorefresh,orderby,language}=initialTopicData;
   

    //states infinity scroling
    const [noGettingStories, setGettingStories] = useState(true)
    

    

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

        setTimeout(async ()=>{
            const response = await axios.get(`https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories?limit=${10}&languages=${lengkey}&order=${activeordertype.type}&page_token=98807224-712f-4658-9d31-98f77773333`)
            setStories([...response.data.stories])
            setGettingStories(false);
        },refreshtimer)

      
    },[autorefresh,orderby,language]);

   

    const getStories = async  (limit) => {
         const response = await axios.get(`https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories?limit=${limit}&languages=${query.language}&order=${query.orderby}&page_token=98807224-712f-4658-9d31-98f77773333`)
         setStories([...response.data.stories])
         setGettingStories(false)
    }
    useEffect(() => {
        getStories(limit).then(() => setGettingStories(false))
        history.push(`/?limit=${limit}`)
    }, [limit])


    //infinity scroling functionality;


    const lastElement = useRef()
    const observer = useRef()


    useEffect(() => {
         console.log("render",noGettingStories);
        if(noGettingStories) return
        if(observer.current) observer.current.disconnect()

        let callback = (entries) => {
            console.log(entries,"entries");
            if(entries[0].isIntersecting && limit < 100){
                setLimit(limit + 10)
                console.log(limit)
                
            }
        }
        observer.current = new IntersectionObserver(callback)
        observer.current.observe(lastElement.current)
        setGettingStories(true)
    }, [noGettingStories])

    return (
          <div className={css.storiscontent}>
            {stories?.map(story => {
                        return <div key={story.id} className={css.itemstori}>
                            <img src={story.domain_cached_large_logo_url} alt={story.title} />
                            <div className={css.storyinfo}>
                               <div className={css.titleandDescription}>
                                    <h3>{story.title}</h3>
                                    <p>{story.description}</p>
                               </div>
                               <div className={css.points} style={{
                                 border:`0.2vw solid ${story.score <20 ? "#ef6c00" : 
                                 story.score >20 && story.score <45 ? "#ffb300"  :  "#4eb495"}`
                               }}>
                                   <p style={{
                                     color:story.score <20 ? "#ef6c00" : 
                                     story.score >20 && story.score <45 ? "#ffb300"  :  "#4eb495"
                                   }}>{story.score}%</p>
                               </div>
                            </div>
                        </div>
                    })
           }
                <div ref={lastElement}>
                    <p className={css.loading}>{noGettingStories && "Loading..."}</p>
                </div>
           
         </div>
    )
}

export default HomePage;