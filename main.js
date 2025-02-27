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

let welcomeMsg = false;

client.on('message', async (message) => {
	if (message.from !== TEST_GROUP_ID) return; // Ignora mensagens de outros grupos
	if (!welcomeMsg){
		await client.sendMessage(message.from, 'Bem vindo a RCS ADVOCACIA, para te ajudar, escolha uma opção:\n 1 - Teste\n 0 - Voltar ao menu de opções');
	}
	welcomeMsg = true;
});

client.on('message_create',message => {
	if (message.body === '1') {
		client.sendMessage(message.from, 'Você escolheu a opção 1\n Digite 0 para voltar ao menu de opções');
	}
	if (message.body === '0') {
	 	client.sendMessage(message.from, 'Escolha uma opção:\n 1 - Teste\n 0 - Voltar ao menu de opções');
	}
});

client.initialize();
