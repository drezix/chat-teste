const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const TEST_GROUP_ID = '120363391063760231@g.us';

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', async (message) => {
	if (message.from !== TEST_GROUP_ID) return; // Ignora mensagens de outros grupos
	await client.sendMessage(message.from, 'Essa é uma mensagem de teste!');
});

client.initialize();
