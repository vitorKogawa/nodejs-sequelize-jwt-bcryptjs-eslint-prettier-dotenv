import { Sequelize, Model } from "sequelize";
import { hash, compare } from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: "user",
      }
    );

    this.beforeSave(this.name, async (user) => {
      if (user.password) user.password_hash = await hash(user.password, 8);
    });

    this.beforeUpdate(this.name, async (user) => {
      if (user.password) user.password_hash = await hash(user.password, 8);
    });

    return this;
  }

  static associate(models){
    User.hasMany(models.File)
  }

  checkPassword(password){
    return compare(password, this.password_hash)
  }
}

export default User;
