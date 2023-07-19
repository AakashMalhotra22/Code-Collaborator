const socket = io();

document.querySelector("#codeContainer").style.display = "none";
document.querySelector("#createFolder").style.display = "none";
document.querySelector("#saveRoom").style.display = "none";

// Join a room by enter Key
let roomName = document.getElementById('RoomName');
roomName.addEventListener('keypress', (event)=>
{
    if(event.key=='Enter')
    {
        event.preventDefault();
        SubmitRoomId(); 
    }
});

// join a room by button
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
        const response = await fetch('http://localhost:4000/api/createNewRoom');
        if(response.ok)
        {
            const roomDetails = await response.json();
            roomName.value = roomDetails.roomId;
        }
    }
    catch(err)
    {
        alert("faiiled to create room");
    }
});

// Enter a room
async function SubmitRoomId()
{
    const roomId = roomName.value;
    //checking if room exist
    try {
        const response = await fetch(`http://localhost:4000/api/checkRoomExists/${roomId}`);
        const data = await response.json();

        if (data.exists =='1') 
        {
            const roomDetails = data.data;
            document.querySelector("#codeContainer").style.display = "flex";
            document.querySelector("#createFolder").style.display = "block";
            document.querySelector("#saveRoom").style.display = "block";
            document.querySelector(".lobby").style.display = "none";
            document.querySelector("#RoomTitle").innerText = `room : ${roomId}`;

            // restoring room prev state
            document.getElementById("html-code").value = roomDetails.HtmlData;
            document.getElementById("css-code").value = roomDetails.CssData;
            document.getElementById("js-code").value = roomDetails.JavaScriptData;

            socket.emit("join-room",roomId);
    
            window.addEventListener('beforeunload', (e)=> {
                e.preventDefault();
                socket.emit("exit-room",roomId);
            });
        }
        else
        {
          alert(`Room with ID ${roomId} does not exist.`);
        }
      } 
      catch (error)
       {
        console.log('Error checking if room exists:');
      }
}