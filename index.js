const { TOKEN, CLIENT_ID } = require('./config.json');

const { REST, Routes } = require('discord.js');

const commands = [
	{
		name: '도움말',
		description: '사용법 설명',
	}
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	]
});

const fs = require('fs');
const article = fs.readFileSync("README.md").toString();
const replies = [
	"그래.",
	"맞아.",
	"어.",
	"그럼.",
	"아마도.",
	"글쎄.",
	"아니.",
	"아아니.",
	"별로.",
	"안.돼."
];
const TEST_MODE = false;
const isTest = function (author) {
	if (!TEST_MODE) return false;

	return author.username !== "fact";
}

const getRandomInt = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const randomMessage = function (msgList) {
	return msgList[getRandomInt(0, msgList.length)];
}

client.on('ready', () => {
	try {
		console.log(`Logged in as ${client.user.tag}!`);
	} catch (error) {

	}
});

client.on('messageCreate', message => {
	try {
		const { content, channel, author } = message;

		if (['소라고둥', '소라고동'].every(word => !channel.name.includes(word))) return;
		if (author.bot) return;

		//테스트용
		if (isTest(author)) return;

		if (content.startsWith("마법의 소라고동님") || content.startsWith("소라고동님") || content.endsWith('?')) {
			message.reply(randomMessage(replies));
		}

	} catch (error) {
		console.log(error);
	}
});

client.on('interactionCreate', async interaction => {
	try {
		if (isTest(interaction.user)) return;

		if (interaction.isChatInputCommand()) {
			if (interaction.commandName === '도움말') {
				await interaction.reply({ content: "\`\`\`" + article + "\`\`\`", ephemeral: true });
			}
		}
	} catch (error) {
		console.log(error);
	}
});

client.login(TOKEN);