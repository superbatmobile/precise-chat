import React, { useState } from 'react';
import'./friendList.css';

const FriendList=()=>{
	return (
		<div className="">
         <ul className="container">
         <li className="photo">
				<img class="w2 h2 w3-ns h3-ns br-100" src="http://tachyons.io/img/avatar-yavor.jpg" />
				<div className="name">
				<h1>Name</h1>
		        </div>
		        <hr class="line"></hr>
		</li>
        </ul>
		</div>
		)
}

export default FriendList;