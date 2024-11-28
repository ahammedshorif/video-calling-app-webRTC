const createUserBtn = document.getElementById("create-user");
const username = document.getElementById("username");
const allUsersHtml = document.getElementById("allusers");
const socket = io();

createUserBtn.addEventListener("click", (e)=>{
    if(username.value != ""){
        const userInputContainer = document.querySelector(".username-input")
        socket.emit("join-user", username.value)
        userInputContainer.style.display='none';

    }
      
})

//handle socket events

socket.on("joined", (allUsers) =>{
    console.log(allUsers);
    

    const createUserHtml = ()=>{
        allUsersHtml.innerHTML= "";
        for(const user in allUsers){
            const li= document.createElement('li');
            li.textContent = `${user} ${user === username.value ? "(you)"  : ""}`
        
            if(user !== username.value){
            const button = document.createElement('button');
            button.classList.add("call-btn");
            // button.addEventListener("click"),(e)=>{ startCall(user)}
            const img = document.createElement('img');
            img.setAttribute("src","/images/phone.png");
            img.setAttribute("width",20);
            button.appendChild(img);
            li.appendChild(button);
            button.addEventListener("click",(e)=>{ startCall(user)})
            
            }
        allUsersHtml.appendChild(li);
        }
         
    }
    
   createUserHtml(); 
})




// start Calling function
const startCall = (user)=>{
 console.log({user});
}