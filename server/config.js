const dotenv = require('dotenv')
const path = require('path')

// Load env vars if env is not production
if (process.env.NODE_ENV !== 'production') {
  // Try loading from multiple possible locations
  dotenv.config({ path: path.join(__dirname, 'config', 'local.env') })
  dotenv.config({ path: path.join(__dirname, '..', '.env') })
  dotenv.config({ path: '.env' })
}

module.exports = {
  PORT: process.env.PORT || 3030,
  JWT_SECRET: process.env.JWT_SECRET || 'default-dev-secret-key',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/poker-game',
  NODE_ENV: process.env.NODE_ENV || 'development',
  INITIAL_CHIPS_AMOUNT: 100000,
  }