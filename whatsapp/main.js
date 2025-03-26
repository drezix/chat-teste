const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const TEST_GROUP_ID = '120363391063760231@g.us';
const TEST_CONTACT = '554396483985@c.us';

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
let userCPF = '';

client.on('message', async (message) => {
	if (message.from !== TEST_GROUP_ID && message.from !== TEST_CONTACT) return; // Ignora mensagens de outros grupos
	if (!welcomeMsg){
		await client.sendMessage(message.from, 'Bem vindo a RCS ADVOCACIA, por favor, informe o seu CPF');
		welcomeMsg = true;
	}
	var cpfMessage = false;
	if (!cpfMessage){	
		if (message.body.replace(/\D/g, '').length === 11) { // Verificando se o corpo da mensagem é um CPF
		userCPF = message.body.replace(/\D/g, ''); 
		await client.sendMessage(message.from, `Sua identificação foi recebida com sucesso! O seu CPF é: ${userCPF}`);
		}
		cpfMessage = true;
	}
});

client.on('message_create',message => {
	if (message.body === '0') {
		client.sendMessage(message.from, 'Escolha uma opção:\n 1 - Teste\n 2 - Teste 2\n 0 - Voltar ao menu de opções');
    }
	if (message.body === '1') {
		client.sendMessage(message.from, 'Você escolheu a opção 1\n Digite 0 para voltar ao menu de opções');
	}
	if (message.body === '2') {
		client.sendMessage(message.from, `O seu CPF é: ${userCPF || 'Não Registrado!'}\n Digite 0 para voltar ao menu de opções`);
    }
});

client.initialize();
