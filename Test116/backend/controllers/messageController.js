const Message = require('../models/messageModel');

exports.createMessage = async (req, res) => {
    const { content, link } = req.body;
    try {
        const newMessage = new Message({ content, link });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
