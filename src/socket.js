module.exports = (http) => {
    const io = require('socket.io')(http);

    //Responde al evento 'connection'
    io.on('connection', (socket) => {
        console.log('User connected.');

        socket.on('chat-message', (msg) => {
            //Emit, para que todos lo reciban en cuanto se envie la respuesta
            io.emit('chat-message', msg);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected.');
        });
    });
}