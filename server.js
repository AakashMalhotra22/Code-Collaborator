require('dotenv').config();

const connectDB = require('./db/connect');
const express = require('express');
const path = require('path');

const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection',(socket)=>
{
    console.log("a user connected");
    socket.on('disconnect',()=>
    {
        console.log("a user disconnected");
    })
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})

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