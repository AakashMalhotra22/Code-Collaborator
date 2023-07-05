require('dotenv').config();

const connectDB = require('./db/connect');
const express = require('express');
const path = require('path');

const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);

var l = io.of('/my');

l.on('connection',(socket)=> // connection is defined event, disconnect event.
{
    console.log("a user connected");
    socket.emit("myevent",{"data":"hi huku hi huku hi hi"});
    // io.sockets.emit('broadcast',{'message':+' users connected!'})
    
    l.on('disconnect',()=> // for acceting an event
    {
        console.log("a user disconnected");
    })

    // socket.on("event1",(data)=>
    // {
    //     console.log("ok");
    //     io.sockets.emit("broadcast","hello");
    // })
})

app.use(express.static(path.resolve("")));

const start = async ()=>
{
    try
    {
        await connectDB(process.env.MONGO_URL);
        console.log("MONGODB is connected");
        server.listen(process.env.PORT,()=>
        {
        console.log(`server is listening at port ${process.env.PORT}`);
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

start();