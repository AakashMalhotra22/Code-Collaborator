const mongoose = require('mongoose');
const{schema,model} = mongoose;

const DetailSchema =new Schema(
{
    roomId:String,
    HtmlData:String,
    CssData:String,
    JavaScriptData:String
});

const Data = model('Detail',DetailSchema);
module.exports=Data;