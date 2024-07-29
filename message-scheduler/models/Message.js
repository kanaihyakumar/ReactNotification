const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: String,
    link: String,
    scheduledTime: Date,
    sent: Boolean,
});

module.exports = mongoose.model('Message', messageSchema);
