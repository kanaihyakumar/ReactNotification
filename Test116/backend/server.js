const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messageRoutes');
const app = express();

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notificationApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
