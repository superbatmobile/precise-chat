import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Redirect,withRouter } from 'react-router';
import { Link } from "react-router-dom";

const ChatList=(props)=>{
  const [chatrooms, setChatrooms] = useState([]);
  const[redirect,setRedirect]=useState(false);
  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

   const addrooms=()=>{
      setRedirect(true);
   }


  useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

   if(redirect){
     return <Redirect push to="/createChat" />
   }
	return(
	<div>
  <article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
	<main class="mw6 center">
  <h1> ChatRooms</h1>
    {chatrooms.map((chatroom) => (


    <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
      <div class="dtc v-mid pl3">
        <h1 class="f6 f5-ns fw6 lh-title black mv0">{chatroom.name} </h1>
      </div>
      <div class="dtc v-mid">
        <form class="w-100 tr">
            <Link to={"/chatroom/" + chatroom._id}  style={{ textDecoration: 'none' }} class="br1 ba bw2 ph3 pv2 mb2 dib black outline:0">
              <div >Join</div>
            </Link>
        </form>
      </div>

    </article>
    ))}
  <article class="mw8 center br2 ba b--light-blue bg-lightest-blue">
   

        <a href="#" class="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2" onClick={addrooms}>Add Chatrooms</a>


  </article>
	</main>
  </article>

	</div>
		)
}

export default ChatList