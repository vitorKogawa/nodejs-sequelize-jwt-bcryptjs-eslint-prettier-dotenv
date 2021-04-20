import { Sequelize, Model } from "sequelize";

class Endereco extends Model {
  static init(sequelize) {
    super.init(
      {
        logradouro: Sequelize.STRING,
        numero: Sequelize.INTEGER,
        complemento: Sequelize.STRING,
        userId: Sequelize.INTEGER,
      },
      { sequelize, tableName: "Endereco" }
    );
  }
}

export default Endereco;
