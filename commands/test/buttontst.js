const {ButtonBuilder, ButtonStyle, SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buttontst')
		.setDescription('Create a button'),
	async execute(interaction) {
		const butt = new ButtonBuilder()
            .setCustomId('butt')
            .setLabel('Кнопка')
            .setStyle(ButtonStyle.Primary);
        const bu = new Discord.ActionRowBuilder()
            .addComponents(butt);

        await interaction.reply({
            content:`Сообщение с кнопками!`,
            components: [bu],
        });
	},
};
