import { Command } from '../../interfaces'
import { SlashCommandBuilder } from '@discordjs/builders'
const { Modal, TextInputComponent, showModal } = require('discord-modals')

export const command: Command = {
  data: new SlashCommandBuilder().setName('apply').setDescription('Apply to become a moderator!'),
  run: async (interaction) => {
    const form = new Modal()
      .setCustomId('application' + interaction.user.id)
      .setTitle('Hello! Welcome to Staff Application')
      .addComponents(
        new TextInputComponent()
          .setCustomId('question1' + interaction.user.id)
          .setLabel('Question 1?')
          .setStyle('LONG') // SHORT or LONG
          .setMinLength(4)
          .setMaxLength(30)
          .setPlaceholder('Write something...')
          .setRequired(true)
      )
      .addComponents(
        new TextInputComponent()
          .setCustomId('question2' + interaction.user.id)
          .setLabel('Question 2?')
          .setStyle('SHORT') // SHORT or LONG
          .setMinLength(4)
          .setMaxLength(10)
          .setPlaceholder('https://www.lyertia.wtf')
          .setRequired(true)
      )

    /// you can add more questions here

    showModal(form, {
      client: interaction.client,
      interaction: interaction,
    })
  },
}
