const socket = io();

new Vue({
    el: '#app',
    data: {
        step: 'nick',
        nick: null,
        message: null,
        messages: []
    },
    methods: {
        send() {
            //Debe coincidir con el metodo emir de socket.js(chat-message)
            socket.emit('chat-message', {
                //Le paso usuario, mensaje y fecha.
                nick: this.nick,
                message: this.message,
                date: new Date().getTime()
            });

            this.message = null;
        },
        signIn() {
            if (!this.nick) {
                return;
            }

            this.step = 'chat';
        }
    },
    mounted() {
        //Aqui se define que el socket siempre esté escuchando(nuestro evento personalizado chat-message) y reciba los mensajes
        socket.on('chat-message', (msg) => {
            this.messages.push(msg);

            setTimeout(() => {
                //scroll to bottom
                const chatContainer = document.querySelector(".chat-container");
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 10);
        });
    }
});