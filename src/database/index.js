import { Sequelize } from "sequelize";
import dbConfig from "../config/database.config";
import User from "./models/User.model";
import Endereco from "./models/Endereco.model";
import File from "./models/File";

const models = [User, Endereco, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
