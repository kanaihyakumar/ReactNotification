import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');

    const sendMessage = async () => {
        try {
            await axios.post('/api/messages', { content, link });
            alert('Message sent successfully');
        } catch (error) {
            alert('Error sending message');
        }
    };

    return (
        <div>
            <h2>Admin Page</h2>
            <div>
                <input
                    type="text"
                    placeholder="Message Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </div>
    );
};

export default AdminPage;
