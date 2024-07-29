const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api', messageRoutes);

const Message = require('./models/Message');

setInterval(async () => {
    const now = new Date();
    const messages = await Message.find({ scheduledTime: { $lte: now }, sent: false });

    messages.forEach(async (message) => {
        io.emit('newMessage', { content: message.content, link: message.link });
        message.sent = true;
        await message.save();
    });
}, 60000);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
