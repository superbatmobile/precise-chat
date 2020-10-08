import React, { useState } from 'react';
import { Redirect } from 'react-router';
import './navigation.css'
import { withRouter } from "react-router-dom";

const SecondNav = (props)=>{
  const [redirect,setRedirect]=useState(false);
  const [chats,setChats]=useState(false);

  const handleOnClick=()=>{
  	localStorage.clear();
  	setRedirect(true);
  }

  const chatRooms=()=>{
   setChats(true);
  }

  if(redirect){
      return <Redirect push to="/signin" />
  }

  if(chats){
  	return <Redirect push to="/home" />
  }

	return(
		<div>
		  <nav>
		      <div id="navbar">
		        <div id="logo">
		          <div class="logo">Precise Chat</div>
		        </div>
		         <div id="links">
		          <p onClick={chatRooms}>ChatRooms</p>
		        </div>
		        <div id="links">
		          <p onClick={handleOnClick}>Sign out</p>
		        </div>

		      </div>
		    </nav>
		</div>
		)
}

export default SecondNav;