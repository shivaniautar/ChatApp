import React, { useState } from 'react';
import {navigate} from '@reach/router';
import io from 'socket.io-client';
 
export default function UserName(props) {
  const [socket] = useState(() => io(':4000'));
  const [newUserName, setNewUserName]=useState ('');
  
  const handleSubmit = e => {
    e.preventDefault();
    //socket.emit('new user', newUserName)
    props.onNewUser(newUserName)
  }

  return (
    <div>
      <h1>The Best Chat Room EVER</h1>
      <form onSubmit = {handleSubmit}>
        <p>Enter a Username</p>
        <input
        onChange = {e => setNewUserName(e.target.value)}
        />
        <button>Start Chatting</button>
      </form>
    </div>
  )
};
