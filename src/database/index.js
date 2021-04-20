import { Sequelize } from "sequelize";
import dbConfig from "../config/database.config";
import User from "./models/User.model";
import Endereco from "./models/Endereco.model";

const models = [User, Endereco];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
