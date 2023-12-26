const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buttontst')
    .setDescription('Create a button'),
  async execute(interaction) {
    const target = interaction.options.getUser('target') ?? 'No User';

    const BtnConfim = new ButtonBuilder()
      .setCustomId('confim')
      .setLabel('Подтвердить ')
      .setStyle(ButtonStyle.Primary);

    const BtnCancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Отмена')
      .setStyle(ButtonStyle.Danger);

    const select = new StringSelectMenuBuilder()
      .setCustomId('usrconf')
      .setPlaceholder('Chose interaction')
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('Request')
          .setDescription('Role Change Request')
          .setValue('rcrequest'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Mute')
          .setDescription('Mute User')
          .setValue('muteuser'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Time Out')
          .setDescription('Give a Time Out status')
          .setValue('timeout'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Ban')
          .setDescription('Ban User')
          .setValue('ban'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Change Name')
          .setDescription('Change User Name')
          .setValue('changename'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Change Role')
          .setDescription('Change User Role')
          .setValue('changerloe'),

      );

    const row = new ActionRowBuilder()
      .addComponents(select);

    await interaction.reply({
      content: `${target}`,
      components: [row],
    });
  },
};
