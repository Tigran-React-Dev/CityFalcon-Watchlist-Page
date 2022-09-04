import React from "react";
import css from "../assets/styles/Header.module.scss";
import logo from "../assets/image/img/logo.svg"
import avatar from "../assets/image/icon/user_avatar.png"

const Header =()=>{


    return (
         <div className={css.header}>
              <img 
                  src={logo} 
                  alt="logo" 
                  className={css.logo} 
                  onClick={()=>{
                    window.scrollTo(0,0)
                  }}
                  />
               <img src={avatar} alt="user avatar" className={css.avatar} />   

         </div>
    )
}

export default Header;