const { Server } = require('ws')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const server = new Server({ port: 3000 })
const WEBSOCKET_OPEN = 1

app.listen(5000, () => {
    console.log('Server started')
})

server.on('connection', ws => {
    ws.on('message', data => {
        server.clients.forEach(client => {
            client.send(JSON.stringify(data))
        })
    });
});