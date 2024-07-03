const express = require('express')
const app = express()

const PORT = process.env.PORT || 3030
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`))

const general = [
  {
    channel: "1",
    account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    text: "First :)"
  },
  {
    channel: "1",
    account: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    text: "Hello everyone!"
  },
  {
    channel: "1",
    account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    text: "Welcome, welcome!"
  },
  {
    channel: "1",
    account: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    text: "Hi guys, does anyone here know how to automatically mint an NFT?"
  },
  {
    channel: "1",
    account: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    text: "NFT? I'd assume you'll use ERC721"
  },
  {
    channel: "1",
    account: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    text: "Send me a DM, I'll help you out :D"
  },
  {
    channel: "1",
    account: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    text: "Guys, what kind of code editor should I use for solidity? I'm kinda new"
  }
]

const intro = [
  {
    channel: "2",
    account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    text: "Hi! My name is John and I'm a blockchain engineer for about 2+ years"
  },
  {
    channel: "2",
    account: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    text: "Hey there! I'm Ann and I want to be a blockchain developer"
  }
]

const jobs = [
  {
    channel: "3",
    account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    text: "Looking for someone that interested in blockchain dev career, comp-sci graduate, 1+ year software engineer, and have working knowledge of Crypto, Ethereum, and Solidity. Send me a DM!"
  }
]

const messages = general.concat(intro, jobs);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('get messages', () => {
    io.emit('get messages', messages)
  })

  socket.on('new message', (msg) => {
    messages.push(msg)
    io.emit('new message', messages)
  })
})