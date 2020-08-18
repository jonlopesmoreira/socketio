const express = require("express");
const app = express();
const socketio = require("socket.io");
app.use(express.static(__dirname + "/public"));

const server = app.listen(3000);



const io = socketio(server)

io.on("connection", socket =>{
    socket.emit("messageFromServer", {dados: "essa é a msg do servidor pro cliente"})
    socket.on("messageToServer", dados=>{
        console.log(dados);

    });
    socket.on('newMessageToServer', (msg)=>{
        io.emit('messageToClients', {text: msg.text });
    })
});

