import { MessageActionRow, MessageButton, MessageEmbed, TextBasedChannel, User } from 'discord.js'

interface IEmbedOptions {
  description: string
  choices?: string[]
  time?: number
}

interface IConfirmationOptions {
  channel: TextBasedChannel
  user: User
  callback: () => Promise<[MessageEmbed, any]>
}
