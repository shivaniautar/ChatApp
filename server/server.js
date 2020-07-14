const express = require('express');

const app = express();

const server = app.listen(4000)

const io = require('socket.io')(server);

let connectedClients=0;
let userName= 'Please enter a username...';
let chatMessages=[];



io.on('connection', socket=>{
    connectedClients++
    console.log('We have '+connectedClients+' connected!');

    // socket.emit('welcome', {
    //    userName 
    // })
    // socket.on('new user', newUserName => {
    //     userName=newUserName
    //     io.emit('name', userName)
    // })
    socket.on('new message', data => {

      chatMessages.push(data)
        io.emit('updated thread', data)
    console.log(data)
})
        
    

    socket.on('disconnect', ()=>{
        connectedClients--;
        socket.broadcast.emit("user left the chat room")
        console.log('We have '+connectedClients+' connected!');
    })

});