import React, { useState,useEffect } from 'react';
import SecondNav from '../navigation/secondNav';
import { Redirect,withRouter } from 'react-router';
import axios from 'axios';
import io from "socket.io-client";
import './chatRoom.css';


const ChatRoom=({match,socket})=>{
  const chatroomId = match.params.id;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");
  const [add,setAdd]=React.useState(false);

    const getMessages = () => {
      const chatroom=chatroomId;
    axios
      .get("http://localhost:8000/message", {
        params:{
        chatroom,
      }
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => {
        setTimeout(getMessages, 3000);
      });

  };


  const sendMessage = () => {
    if (socket) {
     const username = localStorage.getItem("name");
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
        ID:userId,
        username,
      });

      messageRef.current.value = "";
    }
  };
  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", async({ID,message,username}) => {
        /*
        let ms=new Object();
        ms.message=message;
        ms.user=message.rID;
        console.log(ms);

{"_id":newMessage._id,"chatroom":newMessage.chatroom ,"user":newMessage.user ,"message": newMessage.message,"username":newMessage.username}
        */
        const newMess = [...messages, {"user":ID,"message":message,"username":username}];
        console.log(newMess);
        console.log(ID);
        setMessages(newMess);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  /*
        <br/>
               {message.message}
        */

	return(
	<div>
		<SecondNav/>
    <br/>
   <article class="bg-white center mw6 ba b--black-10 mv4">
   <br/>
        {messages.map((message, i) => {
          if(message.user === userId ||message.rID===userId){ 
           return(
                     <div class="container">
            <div key={i} class=  'user-message   b--black-10'>
             <div class="br-pill ph3 pv2 mb2 dib white bg-purple">
              {message.message}
        
              </div>
            </div>
            </div>
            )
            }else{
              return(
            <div key={i} class=  'flex items-center lh-copy pa3   b--black-10'>
             <div class="br-pill ph3 pv2 mb2 dib white bg-purple">
              {message.username}:{message.message}
              </div>
            </div>
            )
          }
          })}
        <br/>
		 <input type="text mw5"  ref={messageRef}/>
     <br/>
     <br/>
         <a class="f6 link dim br2 ba bw2 ph3 pv2 mb2 dib dark-blue" href="#0" onClick={sendMessage} > Submit</a>
     </article>
    </div>
  )
}

export default ChatRoom;