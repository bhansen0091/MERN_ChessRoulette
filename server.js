require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.PORT,
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    server = app.listen(port, () => console.log(`Listening on ${port}`)),
    io = require('socket.io')(server, {
        cors: {
            origin: "*"
        }
    });

    
app.use(cookieParser(),cors({credentials:true, origin: 'http://localhost:3000'}),express.json(),express.urlencoded({"extended":true}));

const chats = [];
    

io.on("connection", socket => {

    //emit sends data only to the client that sent the event
    // socket.emit("welcome", {msg: "from socket"});

    //broadcast.emit sends data to all clients except the sender
    // socket.broadcast.emit("joined", "another client joined the chat");

    // socket.on("game", data => {
        // 
    // })

    socket.on("disconnect", data =>{
        console.log("A User disconnected.");
    })

    socket.on("addToChat", data =>{
        chats.push(data);
        //io.emit sends to all clients connected
        io.emit("updatingMessages", chats)
    })

    // socket.on("madeAMove", data => {
    //     io.emit("newMoveCameIn", data);
    // });
})


require('./server/config/database.config');
require('./server/routes/user.routes')(app);
require('./server/routes/game.routes')(app);  // eventually, pull in game routes