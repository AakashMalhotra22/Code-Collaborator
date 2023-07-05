const path = require("path");

// console.log(__dirname);
// const abs = path.join(__dirname,"server.js");
console.log(path.resolve(""));

const abs = path.join(__dirname,"index.html");
console.log(abs);


const io = require('socket.io')(server);

io.on('connection',(socket)=> // connection is defined event, disconnect event.
{
    console.log("a user connected");
    socket.emit("myevent",{"data":"hi huku hi huku hi hi"});
    io.sockets.emit('broadcast',{'message':+' users connected!'})
    socket.on('disconnect',()=> // for acceting an event
    {
        console.log("a user disconnected");
    })
})

console.log("hi");