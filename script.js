document.querySelector("#codeContainer").style.display = "none";
document.querySelector("#createFolder").style.display = "none";
document.querySelector("#saveRoom").style.display = "none";

const btn = document.getElementById("submit");
btn.addEventListener("click",(e)=>
{
    e.preventDefault();
    let roomName = document.getElementById('RoomName');
    if(roomName.value =="")
    {
        alert("Enter a valid room Name");
    }
    
})