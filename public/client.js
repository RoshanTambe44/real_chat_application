const socket = io();

// user logic------------------------




let username;
do
    {
       username=prompt("enter your name")
    }

while(!username )

// socket id connection---------------------














// message---------------------------


let textarea = document.querySelector(".input-msg");
let button = document.querySelector("button");
let chatsection = document.querySelector(".chat-section"); 
let user = document.querySelector(".users"); 
let usersection = document.querySelector(".user-section"); 
let chatdiv = document.querySelector(".chat-main-div");
let inputdiv = document.querySelector(".input-div");










user.addEventListener("click", function(){
    chatdiv.style.display = "block";
    inputdiv.style.display = "block";
    usersection.style.width = "20%"

          

})



button.addEventListener("click", function(){
    
    sendMessage(textarea.value)  


})

textarea.addEventListener("keyup", function(e){
    if(e.key === "Enter") {
        sendMessage(e.target.value)  
    }    

})

// user adding----------------------------------
function appendId(username, userclass){

    let maindiv = document.createElement("div");
    let classname = userclass;
    maindiv.classList.add(classname );

    let markup = `<h1>${username}</h1>`;
    maindiv.innerHTML = markup;
    usersection.appendChild(maindiv);

 }

//  appendId( );
 

let connectedUsers ={};

socket.on('connect', () => {
    let socketId = socket.id
    console.log(socketId)
    connectedUsers[socketId] = { username: 'User' };

    console.log(connectedUsers)
    

    // send to server ---------------------
                // socket.emit('message', userdet )

    // appendId(userdet, "users")

    
 });






function sendMessage(msgdet){
        let msg ={
            user : `@${username}`,
            massege : msgdet
        }





        
        //append
        appendMassege(msg, "outgoing")

        // send to server------------------

        socket.emit('message', msg )
}


function appendMassege (msg,type){
    let maindiv = document.createElement("div");
    let classname = type;
    maindiv.classList.add(classname, "message" );

    let markup = `<h5>${msg.user}</h5>
    <p>${msg.massege}</p>`;
    maindiv.innerHTML = markup;
    chatsection.appendChild(maindiv);
    textarea.value = ""


}







// recive massege ------------------

socket.on("message", (msg)=>{
        appendMassege(msg, "incoming")
        
  } )