import React, { useState } from 'react';
import { Redirect } from 'react-router';
import './navigation.css'
import { withRouter,useLocation } from "react-router-dom";

const Navigation = (props)=>{
  const [redirect,setRedirect]=useState(false);

  const handleOnClick=()=>{
  	localStorage.clear();
  	setRedirect(true);

  }

  if(redirect){
      return <Redirect push to="/signin" />
  }

  

	return(
		<div>
		  <nav>
		      <div id="navbar">
		        <div id="logo">
		          <div class="logo">Precise Chat</div>
		         </div>
		        <div id="links">
		          <p onClick={handleOnClick}>Sign out</p>
		        </div>
		       </div>
		
		  </nav>
		</div>
		)
}

export default Navigation;