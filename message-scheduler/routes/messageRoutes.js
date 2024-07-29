const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.post('/scheduleMessage', async (req, res) => {
    const { content, link, scheduledTime } = req.body;
    const message = new Message({ content, link, scheduledTime, sent: false });
    await message.save();
    res.json({ message: 'Message scheduled successfully' });
});

router.get('/messages', async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

module.exports = router;
