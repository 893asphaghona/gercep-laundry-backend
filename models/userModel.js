const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

const User = sequelize.define(
    "User",
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Jika ingin username unik
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING, // Sesuaikan tipe data untuk role jika perlu
        allowNull: false,
      }
    },
    {
      tableName: "tb_user", 
      timestamps: false,  // Menonaktifkan kolom createdAt dan updatedAt
    }
);

module.exports = User;
