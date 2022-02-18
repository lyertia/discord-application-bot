import { Event } from '../interfaces'
import { CommandInteraction } from 'discord.js'

export const event: Event = {
  name: 'interactionCreate',
  run: async (client, interaction: CommandInteraction) => {
    if (!interaction.inGuild()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
      await command?.run(interaction)
    } catch (err) {
      if (err) console.log(err)

      await interaction.reply({
        content: 'An error occured while executing that command.',
        ephemeral: true,
      })
    }
  },
}
