import dotenv from 'dotenv'
dotenv.config()

const BOT_TOKEN: string = process.env.BOT_TOKEN || ''
const APPLICATIONS_LOG_CHANNEL: string = process.env.APPLICATIONS_LOG_CHANNEL || ''
const applications = process.env.APPLICATIONS_LOG_CHANNEL
if (!BOT_TOKEN || BOT_TOKEN === '') {
  throw new Error('Missing environment variable, BOT_TOKEN')
} else if (!APPLICATIONS_LOG_CHANNEL || APPLICATIONS_LOG_CHANNEL === '') {
  throw new Error('Missing environment variable, APPLICATIONS_LOG_CHANNEL')
}

const config: Record<string, string> = {
  BOT_TOKEN,
  APPLICATIONS_LOG_CHANNEL,
}

export default config
