import { Sequelize } from 'sequelize-typescript'
import * as path from 'path';
import config from '../config/database';

class Db {
  constructor() {
    return this.sequelize();
  }

  sequelize() {
    const env = config[process.env.APP_ENV]
    const sequelizeconnection = new Sequelize({
      // operatorsAliases: Sequelize.Op as any,
      name: env.database,
      username: env.username,
      password: env.password,
      dialect: env.dialect,
      host: env.host,
      modelPaths: [path.join(__dirname, '../../src/models/!(index).ts')]
    });

    const db = {
      sequelize: sequelizeconnection,
      Sequelize
    };

    return db;
  }
}

const database = new Db();

export default database;
