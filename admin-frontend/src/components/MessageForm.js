import React, { useState } from 'react';
import axios from 'axios';

const ENDPOINT = 'http://localhost:3000';

const MessageForm = () => {
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${ENDPOINT}/api/scheduleMessage`, { content, link, scheduledTime });
        alert('Message scheduled successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Message Content" 
                required 
            />
            <input 
                type="text" 
                value={link} 
                onChange={(e) => setLink(e.target.value)} 
                placeholder="Message Link" 
            />
            <input 
                type="datetime-local" 
                value={scheduledTime} 
                onChange={(e) => setScheduledTime(e.target.value)} 
                required 
            />
            <button type="submit">Schedule</button>
        </form>
    );
};

export default MessageForm;
