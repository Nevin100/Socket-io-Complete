// packages
import express from "express";
import http from "http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

// Instances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serving HTML File
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => res.sendFile(join(__dirname, "index.html")));

// Define a connection event handler
io.on("connection", (client) => {
  console.log("User Connected To (server)");

  //Emit amessage:
  client.emit("message", "Welcome to server!!");

  client.on("disconnect", () => {
    console.log("User Disconnected from (server)");
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
