Data=require('../models/roomDetails');

const doCreateRoom = async(req,res)=>
{
    try 
    {
      const newRoom = await Data.create({HtmlData:'',CssData:'',JavaScriptData:''});
      res.status(201).json({ roomId: newRoom._id.toString() });
    } 
    catch (error) 
    {
      console.error('Error creating a new room:', error);
      res.status(500).json({ error: 'Something went wrong.' });
    }
}

async function checkIfObjectExistsById(id) 
{
    try 
    {
      const foundObject = await Data.exists({ _id: id });
      return foundObject;
    } 
    catch (error) 
    {
      console.error('Error checking if the object exists:', error);
      return false;
    }
}

const doCheckRoom = async(req,res)=>
{
    try
    {
      const id = req.params.id;
      const objectExists = await checkIfObjectExistsById(id);
      res.json({ exists: objectExists });
    } 
    catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong.' });
    }
}

const doSaveRoom = async(req,res)=>
{
    return "hi";
}

module.exports = {doCreateRoom, doCheckRoom, doSaveRoom};