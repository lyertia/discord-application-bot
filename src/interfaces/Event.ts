import Client from '../structures/Client'
import { ClientEvents } from 'discord.js'

export type EventRun = (client: Client, ...args: any[]) => any

export interface Event {
  name: keyof ClientEvents
  run: EventRun
}
