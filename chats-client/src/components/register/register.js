import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from "react-router-dom";
import axios from "axios";

const Register=(props)=>{
	const [email,setEmail]=useState(' ');
	const [password,setPassword]= useState(' ');
	const [name,setName]=useState('');
	const [confirm,setConfirm]= useState(' ');
    const [redirect,setRedirect]=useState(false);
    const [destination,setDestination]=useState(' ');

    const onNameChange=(event)=>{
    	setName(event.target.value);
    }

	const onEmailChange = (event)=>{
	  setEmail(event.target.value);
	}


	const onPasswordChange = (event)=>{
	   setPassword(event.target.value);
	 }

	const onConfirmChange = (event)=>{
	   setConfirm(event.target.value);
	 }

	 const handleOnClick=() =>{
	 	if(confirm===password){
     axios
      .post("http://localhost:8000/user/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("CC_Token", response.data.token);
        localStorage.setItem("name",name);
        props.history.push("/home");
      })
	}else{
		alert('password does not match');
	}
}

	 const signinPath=()=>{
	 	//setDestination('_signin_');
	 	//setRedirect('true');
	    props.history.push("/signin");
	 }


	return (
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
				      <legend className="f2 fw6 ph0 mh0">Sign up</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" for="name">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  type="text" name="name"  id="name" onChange={onNameChange} />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  type="email" name="email-address"  id="email-address" onChange={onEmailChange} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" for="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  type="password" name="password"  id="password" onChange={onPasswordChange}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" for="password">Password Confirmation</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"  type="password" name="password"  id="password" onChange={onConfirmChange}/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      onClick={handleOnClick}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Register" />
				    </div>
					<div className="lh-copy mt3">
					<p
					onClick={signinPath}
					className="f6 link dim black db">SignIn
					</p>
					</div>
				  </div>
				</main>
				</article>
		</div>
	)

}

export default Register;