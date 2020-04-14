import { throwError } from "./utils/Error";
import sequelize from '../db/models'

// https://github.com/RobinBuschmann/sequelize-typescript-example
export default class DataSource {
  private sqlize: any;

  get sequelize() {
    return this.sqlize;
  }

  constructor() {
    try {
      this.sqlize = sequelize
    } catch (e) {
      throwError(e);
    }
  }

  public async init() {
    //return await this.sqlize.sync();
  }
}
