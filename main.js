const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', message => {
	if (message.body === 'oi') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'gay');
	}
});

client.initialize();
