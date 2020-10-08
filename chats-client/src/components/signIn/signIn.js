import React, { useState } from 'react';
import './signIn.css'
import { Redirect } from 'react-router';
import { withRouter } from "react-router-dom";
import axios from "axios";


const SignIn=(props)=>{
  const [redirect,setRedirect]=useState(false);
  const [destination,setDestination]=useState(' ');
  const [email,setEmail]=useState(' ');
  const [password,setPassword]= useState(' ');

const onEmailChange = (event)=>{
  setEmail(event.target.value);
}


const onPasswordChange = (event)=>{
   setPassword(event.target.value);
 }

 const handleOnClick=() =>{

    axios
      .post("http://localhost:8000/user/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("CC_Token", response.data.token);
        localStorage.setItem("name",response.data.name);
        props.history.push("/home");
      })
    //setRedirect(true)
    //setDestination(value);
    }
const registerPath=()=>{
	setRedirect(true);
	 props.history.push("/register");
} 


/*
if (redirect) {
	if(destination=== '_home_'){
	 return <Redirect push to="/create" />
	}else{
	 return <Redirect push to="/register" />
	}
}
*/

return(
	<div>
		  <nav>
		      <div id="navbar">
		        <div id="logo">
		          <div class="logo">CoEdit</div>
		        </div>

		      </div>
		    </nav>
	<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
	<main className="pa4 black-80">
	  <div className="measure ">
	    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
	      <div className="mt3">
	        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
	        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  type="email" name="email-address"  id="email-address" onChange={onEmailChange} />
	      </div>
	      <div className="mv3">
	        <label className="db fw6 lh-copy f6" for="password">Password</label>
	        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  type="password" name="password"  id="password" onChange={onPasswordChange}/>
	      </div>
	    </fieldset>
	    <div className="">
	      <input
	      onClick={handleOnClick}
	      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
	      type="submit" 
	      value="Sign in" />
	    </div>
	    <div className="lh-copy mt3">
	      <p
	          onClick={registerPath}
	          className="f6 link dim black db">Register
	      </p>
	    </div>
	  </div>
	</main>
	</article>
	</div>
)
}

export default SignIn;