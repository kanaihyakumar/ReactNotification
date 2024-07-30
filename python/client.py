import socket
from plyer import notification

HOST = 'SERVER_IP_ADDRESS'  # Replace with the IP of the main computer
PORT = 5000

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((HOST, PORT))

def show_notification(title, message):
    notification.notify(
        title=title,
        message=message,
        app_name="Notification System",
        timeout=10
    )

while True:
    message = client.recv(1024).decode('utf-8')
    if message:
        show_notification("New Message", message)
    else:
        break

client.close()