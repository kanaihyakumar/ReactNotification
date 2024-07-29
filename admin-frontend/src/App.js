// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';

function App() {
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${ENDPOINT}/scheduleMessage`, { content, link, scheduledTime });
    alert('Message scheduled successfully');
  };

  return (
    <div className="App">
      <h1>Schedule Message</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Message Content" required />
        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Message Link" />
        <input type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} required />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}

export default App;
