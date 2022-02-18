import { Event } from '../interfaces'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'

export const event: Event = {
  name: 'ready',
  run: async (client) => {
    console.log(`${client.user?.username} is ready. LYERTIA`)
    console.log("-----------------------------------------------------")

    const rest = new REST({
      version: '9',
    }).setToken(process.env.BOT_TOKEN!)

    const USER_ID = client.user?.id

    const command = client.commands.map((m) => m.data)

    ;(async () => {
      try {
        if (process.env.STATUS === 'production') {
        } else {
          await rest.put(Routes.applicationGuildCommands(USER_ID!, process.env.GUILD_ID!), {
            body: command,
          })
        }
      } catch (error) {
        console.log(error)
      }
    })()
  },
}
