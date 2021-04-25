"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("file", "userId", {
      type: Sequelize.INTEGER,
      references: { model: 'user', key: 'id' },
      allowNul: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn('file', 'userId'),
};
