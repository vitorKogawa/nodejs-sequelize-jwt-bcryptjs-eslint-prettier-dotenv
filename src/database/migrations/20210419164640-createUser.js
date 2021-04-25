"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        provider: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { freezeTableName: true }
    );
  },

  down: async (queryInterface, Sequelize) => queryInterface.dropTable("user"),
};
