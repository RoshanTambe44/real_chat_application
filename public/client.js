    const socket = io();


    //fetch data from document--------------------------

    let textarea = document.querySelector(".input-msg");
    let button = document.querySelector("button");
    let chatsection = document.querySelector(".chat-section"); 
    let blanksection = document.querySelector(".blank-section"); 
    let user = document.querySelectorAll(".users");
    let usersection = document.querySelector(".user-section"); 
    let chatdiv = document.querySelector(".chat-main-div");
    let inputdiv = document.querySelector(".input-div");
    let chatHeadingName = document.querySelector(".chat-hading h1");
    let chatHeadingId = document.querySelector(".chat-hading h2");
    let title = document.querySelector(".title");




    // user logic------------------------

    let username;
    do
        {
        username=prompt("enter your name")
        }

    while(!username )



    //show on title---------------------------------------
    title.innerHTML = username;


    //create variables------------------------------------
    const connectedUsers ={};
    var targetSocketId;
    var socketId;


    // socket id--------------------------------------------
    socket.on('connect', () => {
        socketId = socket.id
        console.log(`thhis user id: ${socketId}`)
        connectedUsers[socketId] = { username: username };

        

        // send to server------------------
        socket.emit('new-user', username, socketId )
        
    })






    //update user list -------------------------------
    socket.on('user-list', (users)=>{

        usersection.innerHTML = "" ;
        user_array = Object.values(users);
        user_array_keys = Object.keys(users);
        const currentUserId = getCurrentUserId();
        
        const onlineUsers = Object.keys(users).filter(user => user !== currentUserId);
    
            onlineUsers.forEach((user) => {
            let maindiv = document.createElement("div");
            maindiv.innerText = users[user];
            maindiv.classList.add('users');
            usersection.appendChild(maindiv);
            
            maindiv.addEventListener("click", function(e){
            myary = user_array.indexOf(e.target.innerHTML)
            targetSocketId = user_array_keys[myary] 
            console.log("clicked user id : "+ targetSocketId)
            chatdiv.style.display = "block";
            inputdiv.style.display = "block"; 
            usersection.style.width = "20%";
            chatHeadingName.innerHTML = e.target.innerHTML;
            chatHeadingId.innerHTML = targetSocketId;
            })

        })
    })


    function getCurrentUserId() {
    return socketId;
    }

   



    button.addEventListener("click", function (){
        
        sendMessage(textarea.value, targetSocketId)
            

    })

    textarea.addEventListener("keyup", function(e){
        if(e.key === "Enter") {
            sendMessage(e.target.value, targetSocketId)  
        }    

    })



        
    





    //send messege------------------------------------
    function sendMessage(msgdet, targetSocketId){

            let msg ={
                user : `@${username}`,
                massege : msgdet
            }
            
            // console.log(targetSocketId )
            //append
            appendMassege(msg, "outgoing")
            console.log(`from ${username}`,msg)
            // send to server------------------

            socket.emit('privateMessage', targetSocketId, msg);

        
    }



    //append messages-----------------------------------
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
    socket.on("privateMessage", (msg, senderId )=>{
            console.log(`sender ID:${senderId}`, msg); 
            appendMassege(msg, "incoming");     
    } )

    