const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: String,
    link: String,
    sentAt: { type: Date, default: Date.now },
    clicked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Message', MessageSchema);
