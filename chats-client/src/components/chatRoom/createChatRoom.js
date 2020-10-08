import React, { useState,useEffect } from 'react';
import SecondNav from '../navigation/secondNav';
import { Redirect,withRouter } from 'react-router';
import axios from "axios";
const CreateChatRoom=(props)=>{
  
  const nameRef = React.createRef();
  const [redirect,setRedirect]=useState(false);

  const handleOnClick=() =>{
    const name= nameRef.current.value;
    axios
    .post("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      name,
    })
    .then((response)=>{
        props.history.push("/home");
    }
      )
    }
    







	return (
		<div>
		<SecondNav/>
<header class="tc ph4">
  <h1 class="f3 f2-m f1-l fw2 black-90 mv3">
    Name the chatroom
  </h1>
<input class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text"             ref={nameRef}/>
  <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-mid-gray" href="#0" onClick={handleOnClick}>Confirm</a>
</header>

		</div>
		)
}

export default CreateChatRoom;