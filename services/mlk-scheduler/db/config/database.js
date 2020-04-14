const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../env/node.env') })

const config = {
  username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeSeed"
}

module.exports = {
  dev: {
    ...config
  },
  development: {
    ...config
  },
  test: {
    
    ...config
  },
  production: {
    
    ...config
  }
};
