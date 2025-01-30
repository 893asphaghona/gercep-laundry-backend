// models/Karyawan.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Koneksi Sequelize

const Karyawan = sequelize.define('Karyawan', {
  id_karyawan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alamat: {
    type: DataTypes.STRING
  },
  no_whatsapp: {
    type: DataTypes.STRING
  },
  tanggal_masuk: {
    type: DataTypes.DATE
  },
  gaji: {
    type: DataTypes.DECIMAL(10, 2)
  },
}, {
  tableName: 'tb_karyawan',
  timestamps: false // Jika tidak ada kolom createdAt dan updatedAt
});

module.exports = Karyawan;
