const io = require('socket.io')(process.env.PORT || 3000, {
    cors: { origin: "*" } // Autorise GitHub Pages à se connecter
});

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    // Quand on reçoit un dessin, on l'envoie à TOUS les autres
    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });

    // Quand on efface le canvas
    socket.on('clear', () => {
        socket.broadcast.emit('clear');
    });
});