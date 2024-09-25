const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 1001 }); // Change 8080 to your preferred port

const clients = new Set();

server.on('connection', (socket) => {
    clients.add(socket);

    socket.on('message', (message) => {
        // Broadcast message to all connected clients
        clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        clients.delete(socket);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');