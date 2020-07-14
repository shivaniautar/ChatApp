import React, { useState, useEffect } from "react";
import io from "socket.io-client";

export default function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage]=useState('');
  const [socket] = useState(() => io(':4000'));
  const [name, setName]=useState('')

  useEffect(() => {
    socket.on('name', newUser =>{
      setName(newUser)
    });
    socket.on("updated thread", data =>
    setMessages(prevMessages =>{ 
      return[data, ...prevMessages];
    })
    );
  }, []);
  
  function handleSubmit(e){
    e.preventDefault()
    socket.emit('new message', {
        message: newMessage,
        user: props.user

    })
    setNewMessage('')
  }
    console.log(props)
  return (
    <div>
      <h1>The Best Chat Room EVER!</h1>
      {messages.map((message,i)=>(
          <p key={i}> {message.user}says:"{message.message}"</p>
        ))}
      <form onSubmit={handleSubmit}>
        <input 
        onChange = {e => setNewMessage(e.target.value)}/>
        <button>Send</button>
      </form>
    </div>
  );
}