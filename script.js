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
    }
}