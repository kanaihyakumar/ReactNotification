import socket
import threading
from plyer import notification
import tkinter as tk
from tkinter import scrolledtext

# Network Configuration
HOST = '0.0.0.0'  # Listen on all available interfaces
PORT = 5010  # Choose an available port

# Create a socket server
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))
server.listen()

# List to store connected clients
clients = []

def broadcast(message):
    """Send a message to all connected clients"""
    for client in clients:
        try:
            client.send(message.encode('utf-8'))
        except:
            clients.remove(client)

def handle_client(client):
    """Handle incoming messages from a client"""
    while True:
        try:
            message = client.recv(1024).decode('utf-8')
            if message:
                show_notification("New Message", message)
                broadcast(message)
            else:
                clients.remove(client)
                client.close()
                break
        except:
            clients.remove(client)
            client.close()
            break

def accept_connections():
    """Accept incoming client connections"""
    while True:
        client, address = server.accept()
        clients.append(client)
        thread = threading.Thread(target=handle_client, args=(client,))
        thread.start()

def show_notification(title, message):
    """Display a Windows notification"""
    notification.notify(
        title=title,
        message=message,
        app_name="Notification System",
        timeout=8000
    )

def send_message():
    """Send a message from the GUI"""
    message = input_box.get("1.0", tk.END).strip()
    if message:
        show_notification("Sent Message", message)
        broadcast(message)
        input_box.delete("1.0", tk.END)

# GUI Setup
root = tk.Tk()
root.title("Notification System")

input_box = scrolledtext.ScrolledText(root, width=40, height=4)
input_box.pack(padx=10, pady=10)

send_button = tk.Button(root, text="Send", command=send_message)
send_button.pack(pady=5)

# Start the server in a separate thread
server_thread = threading.Thread(target=accept_connections)
server_thread.start()

# Start the GUI
root.mainloop()