import express from "express";
import {createServer} from "http";
import {Server} from "socket.io"
import { fileURLToPath} from "url";
import {dirname,join} from "path";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT ?? 3000;
//
const __dirname = dirname(fileURLToPath(import.meta.url));

const allUsers= {};

//exposing the public folder to outside world
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/index.html');
}) 

//handle socket connection
io.on("connection",(socket)=>{
    console.log(`someone connected to socket id is ${socket.id}`);
    socket.on("join-user", (username)=>{
       console.log(`${username} joined socket connection`);
       allUsers[username] = {username, id: socket.id};
       //inform the all users to someones join the socket

       io.emit("joined",allUsers);
    })
} )
server.listen(PORT, ()=>{
    console.log("listening on port 3000");
});
