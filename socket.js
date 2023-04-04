const WebSocket = require('ws')
const express = require('express')
const cors = require('cors')

let app = express()

app.use(express.json({ extended: false }));
app.use(express.static('public'));

const server = new WebSocket.Server({ server: app.listen(5000) });

app.use(cors())

server.on('connection', (socket) => {
  socket.on('message', (msg) => {
    server.clients.forEach(client => {
      client.send(JSON.stringify(msg));
    })
  });
});