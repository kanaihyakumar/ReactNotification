const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');
const socketIoClient = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('index.html');

    const socket = socketIoClient(ENDPOINT);
    socket.on('newMessage', (data) => {
        const notification = new Notification({
            title: 'New Message',
            body: data.content,
        });

        notification.on('click', () => {
            if (data.link) {
                require('electron').shell.openExternal(data.link);
            }
            socket.emit('messageRead', { success: true });
        });

        notification.show();
        setTimeout(() => {
            socket.emit('messageRead', { success: false });
        }, 24 * 60 * 60 * 1000); // 24 hours
    });
}

app.on('ready', createWindow);
