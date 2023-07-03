require('dotenv').config();

const express = require('express');
const app = express();


app.get('/',(req,res)=>{
    res.send("hello");
    return;
})

app.listen(process.env.PORT,()=>
{
    console.log(`server is listening at port ${process.env.PORT}`);
})