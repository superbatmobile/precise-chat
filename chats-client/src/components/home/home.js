import React, { useState } from 'react';
import Navigation from '../navigation/navigation';
import ChatList from '../chatList/chatList';


const Home=()=>{
	return (
	<div>
		<Navigation/>
		<ChatList/>
	</div>

	)
}

export default Home;