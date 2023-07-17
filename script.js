const socket = io();

document.querySelector("#codeContainer").style.display = "none";
document.querySelector("#createFolder").style.display = "none";
document.querySelector("#saveRoom").style.display = "none";

let roomName = document.getElementById('RoomName');
roomName.addEventListener('keypress', (event)=>
{
    if(event.key=='Enter')
    {
        event.preventDefault();
        SubmitRoomId(); 
    }
});

const joinButton = document.getElementById("join");
joinButton.addEventListener("click",(event)=>
{
    event.preventDefault();
    SubmitRoomId(); 
});

//create a room
const createRoomButton = document.getElementById("newRoom")
createRoomButton.addEventListener("click",async (event)=>
{
    event.preventDefault();
    console.log("hi");
    try
    {
        const data = 
        {
            roomId: '',
            HtmlData: '',
            CssData: '',
            JavaScriptData: ''
        };
        const response = await fetch('http://localhost:4000/create-new-room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if(response.ok)
        {
            const roomDetails = await response.json();
            console.log(roomDetails.roomId);
            alert(`New Room Created with Room Id ${roomDetails.roomId} `);
        }
    }
    catch(err)
    {
        alert("faiiled to create room");
    }
});

function SubmitRoomId()
{
    if(roomName.value =="")
    {
        alert("Enter a valid Room Id");
    }
    else
    {
        document.querySelector("#codeContainer").style.display = "flex";
        document.querySelector("#createFolder").style.display = "block";
        document.querySelector("#saveRoom").style.display = "block";
        document.querySelector(".lobby").style.display = "none";
        document.querySelector("#RoomTitle").innerText = `room : ${roomName.value}`;
        socket.emit("join-room",roomName.value);

        window.addEventListener('beforeunload', (e)=> {
            e.preventDefault();
            socket.emit("exit-room",roomName.value);
        });
    }
}