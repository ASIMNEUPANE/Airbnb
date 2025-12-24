import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface:QueryInterface,Sequelize:typeof DataTypes) {
    await queryInterface.createTable('hotels',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address:{
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      rating:{
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      ratingCount:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE,
        allowNull: true,
      }

    })
   
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.dropTable('hotels');
   
  }

};