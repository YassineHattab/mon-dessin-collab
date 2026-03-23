const io = require('socket.io')(process.env.PORT || 3000, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    // Quand un utilisateur rejoint une salle spécifique
    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        console.log(`Utilisateur connecté à la salle : ${roomName}`);
    });

    // On reçoit le dessin et on le renvoie UNIQUEMENT à la même salle
    socket.on('drawing', (data) => {
        // data contient maintenant { x, y, color, width, room }
        socket.to(data.room).emit('drawing', data);
    });

    socket.on('clear', (roomName) => {
        socket.to(roomName).emit('clear');
    });
});
