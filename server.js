require('dotenv').config();

const connectDB = require('./db/connect');
const express = require('express');

const app = express();


app.get('/',(req,res)=>{
    res.send("hello");
    return;
})


const start = async ()=>
{
    try
    {
        await connectDB(process.env.MONGO_URL);
        console.log("MONGODB is connected");
        app.listen(process.env.PORT,()=>
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