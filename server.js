require('dotenv').config();

const connectDB = require('./db/connect');
const express = require('express');
const path = require('path');
const Data=require('./models/roomDetails');
const roomRoute = require('./routes/room');

const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);
io.on('connection',(socket)=> 
{
    console.log("socket is connected");
    socket.on("join-room",async (roomName)=>
    {
        console.log(`A user requested to join room with roomName ${roomName}`);

    })
    socket.on("exit-room",async (roomName)=>
    {
        console.log(`A user left this room with roomName ${roomName}`);
        
    })

    socket.on("createNewRoom", async()=>
    {
        const newRoom = await Data.create({HtmlData:'',CssData:'',JavaScriptData:''});
        console.log(newRoom._id);
    })

})

app.use(express.static(path.resolve("")));
app.use('/api', roomRoute);

// // creating new room route
// app.post('/api/createNewRoom', async (req, res) => {
//     try 
//     {
//       console.log("enter");
//       const newRoom = await Data.create({HtmlData:'',CssData:'',JavaScriptData:''});
//       console.log(newRoom._id.toString());
//       res.status(201).json({ roomId: newRoom._id.toString() });
//     } catch (error) {
//       console.error('Error creating a new room:', error);
//       res.status(500).json({ error: 'Something went wrong.' });
//     }
//   });

// // checking if a room exist
// async function checkIfObjectExistsById(id) {
//     try {
//       const foundObject = await Data.exists({ _id: id });
//       return foundObject;
//     } 
//     catch (error) {
//       console.error('Error checking if the object exists:', error);
//       return false;
//     }
//   }
  
// app.get('/api/checkRoomExists/:id', async (req, res) => {
//     try
//     {
//       const id = req.params.id;
  
//       const objectExists = await checkIfObjectExistsById(id);
  
//       res.json({ exists: objectExists });
//     } 
//     catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Something went wrong.' });
//     }
//   });
  

// Connecting to Database
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


// socket.emit("myevent",{"data":"hi huku hi huku hi hi"});
// // io.sockets.emit('broadcast',{'message':+' users connected!'})

// l.on('disconnect',()=> // for acceting an event
// {
//     console.log("a user disconnected");
// })

// // socket.on("event1",(data)=>
// // {
// //     console.log("ok");
// //     io.sockets.emit("broadcast","hello");
// // })