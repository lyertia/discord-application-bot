import Client from '../structures/Client'
import { CommandInteraction, CommandInteractionOption } from 'discord.js'

export type CommandRun = (interaction: CommandInteraction) => any

export interface Command {
  data: any
  run: CommandRun
}
