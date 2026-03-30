const dotenv = require('dotenv')
const path = require('path')

// Load env vars - try multiple locations
dotenv.config({ path: path.join(__dirname, 'config', 'local.env') })
dotenv.config({ path: path.join(__dirname, '..', '.env') })
dotenv.config({ path: '.env' })

module.exports = {
  PORT: process.env.PORT || 3030,
  JWT_SECRET: process.env.JWT_SECRET || 'default-dev-secret-key',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/poker-game',
  NODE_ENV: process.env.NODE_ENV || 'development',
  INITIAL_CHIPS_AMOUNT: 100000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
}