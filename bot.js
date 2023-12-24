// Предворительные настройки
const Discord = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

let config = require('./config.json');
const internal = require('node:stream');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	]
});

let token = config.token;
let prefix = config.prefix;

client.commands = new Collection();

// Загрузка файлов команд
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	console.log(`[INFO] Загрузка файлов комманды`);
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARN] Комманда в ${filePath} не имеет поля data или exexute`);
		}
	}
}

// Отклик на команды
client.on(Events.InteractionCreate, async interaction => {
	console.log(`[INFO] Полученна комманда ${interaction.commandName}`);
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`[WARN] Не найдена комманда ${interaction.commandName}`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: '[WARN] Ошибка при выполнении команды', ephemeral: true });
		} else {
			await interaction.reply({ content: '[WARN] Ошибка при выполнении команды', ephemeral: true });
		}
	}
});

// Присоеденение нового участника
client.on(Events.GuildMemberAdd, async member => {
	console.log(`[INFO] У нас новый Имперец - ${member.user.globalName}!`);

	await member.guild.systemChannel.send({
		content: `Приветствуем в Großes Imperium, ${member.user}!\nОзнакомтесь с уставом Империи.`,
	});
	var role = member.guild.roles.cache.find(role => role.name === "Рядовой Империи");
	await member.roles.add(role);
	await member.setNickname(`Рядовой ${member.user.globalName}`);
});

// Запуск бота
client.login(token); // Авторизация бота
client.once(Events.ClientReady, c => { console.log("[INFO] " + client.user.username + " запустился"); });
