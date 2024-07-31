import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationBanner = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get('/api/messages');
            setMessages(response.data);
        };

        fetchMessages();
    }, []);

    return (
        <div>
            {messages.map((message) => (
                <div key={message._id}>
                    <p>{message.content}</p>
                    <a href={message.link} target="_blank" rel="noopener noreferrer">{message.link}</a>
                </div>
            ))}
        </div>
    );
};

export default NotificationBanner;
