import '../utils/string.extensions'

import Discord from 'discord.js'
import { Client, Collection, Intents, MessageEmbed } from 'discord.js'
import path from 'path'
import { readdirSync } from 'fs'
import { Command, Event, Config } from '../interfaces'
const discordModals = require('discord-modals')
const { format, parse } = require('date-and-time')
import config from '../config'

export default class InfernoClient extends Client {
  public commands: Collection<string, Command> = new Collection()
  public events: Collection<string, Event> = new Collection()
  public aliases: Collection<string, Command> = new Collection()

  public constructor() {
    super({
      intents: [
        [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES],
      ],
      presence: {
        status: 'idle',
        activities: [{ name: 'www.lyertia.wtf', type: 'PLAYING' }],
      },
      partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
    })
  }

  public async init() {
    /* Commands */
    const commandPath = path.join(__dirname, '..', 'commands')
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'))

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`)
        this.commands.set(command.data.name, command)
      }
    })

    /* Events */
    const eventPath = path.join(__dirname, '..', 'events')
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`)
      this.events.set(event.name, event)
      this.on(event.name, event.run.bind(null, this))
    })

    this.login(config.BOT_TOKEN)
    discordModals(this)

    this.on('modalSubmit', (modal) => {
      const logs = this.channels.cache.get(config.APPLICATIONS_LOG_CHANNEL) as Discord.TextChannel
      if (!logs) return console.log('Cannot find log channel')
      const answer1 = modal.getTextInputValue('question1' + modal.user.id)
      const answer2 = modal.getTextInputValue('question2' + modal.user.id)
      //if you added more questions, you can add them answers here
      modal.reply('Thank you for your application! We will review it as soon as possible.')
      let result: string = `**${modal.user.tag}**\n\n**Question 1:** ${answer1}\n**Question 2:** ${answer2}`
      console.log(format(new Date(), 'YYYY/MM/DD HH:mm') + result.replaceAll('**', ' '))
      console.log('-----------------------------------------------------')
      if (result.length > 2040) {
        result =
          'The application is too long to be displayed in the embed, please check the bot logs.'
        console.log('^^^^ Cannot send embed, sending text to console instead ^^^^')
        console.log('-----------------------------------------------------')
      }

      const embed = new MessageEmbed()
        .setTitle('Application from ' + modal.user.tag)
        .setDescription(result)
        .setTimestamp()
        .setFooter({ text: 'Made by lyertia' })

      logs.send({ embeds: [embed] })
    })
  }
}
