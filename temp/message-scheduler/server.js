const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/messageScheduler', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Message schema
const messageSchema = new mongoose.Schema({
  content: String,
  link: String,
  scheduledTime: Date,
  sent: Boolean,
});

const Message = mongoose.model('Message', messageSchema);

// API to schedule a message
app.post('/scheduleMessage', async (req, res) => {
  const { content, link, scheduledTime } = req.body;
  const message = new Message({ content, link, scheduledTime, sent: false });
  await message.save();
  res.json({ message: 'Message scheduled successfully' });
});

// API to get scheduled messages
app.get('/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// Schedule a job to send messages
setInterval(async () => {
  const now = new Date();
  const messages = await Message.find({ scheduledTime: { $lte: now }, sent: false });

  messages.forEach(async (message) => {
    io.emit('newMessage', { content: message.content, link: message.link });
    message.sent = true;
    await message.save();
  });
}, 60000); // Check every minute

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
