import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/signIn/signIn'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/home';
import Register from './components/register/register';
import CreateChatRoom from './components/chatRoom/createChatRoom';
import ChatRoom from './components/chatRoom/chatRoom'
import io from "socket.io-client";
import RootPage from './components/root/root';
//import CreateMessage from './components/message/createMessage'


function App() {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
      const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });


      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
      });

      newSocket.on("connect", () => {
        console.log("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  return (

    <div className="App">
    <BrowserRouter>
      <Switch>
    <Route path="/" exact component={RootPage} />
    <Route path="/signin" render={(props)=><SignIn {...props}  />} />
    <Route path="/home" exact component={Home}/>
    <Route path="/register" exact component={Register}/>
    <Route path="/createChat" exact component={CreateChatRoom}/>
     <Route
          path="/chatroom/:id"
          render={(props) => <ChatRoom{...props} socket={socket} />}/>

      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
