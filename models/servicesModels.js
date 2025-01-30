const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Model untuk tb_laundry_normal
const LaundryNormal = sequelize.define('LaundryNormal', {
    id_laundry_normal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_layanan: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    waktu_pengerjaan: {
        type: DataTypes.ENUM('3 Jam', '5 jam', '1 hari', '2 Hari', '3 Hari', '1 minggu'),
        allowNull: false
    }
}, {
    tableName: 'tb_laundry_normal',
    timestamps: false
});

// Model untuk tb_laundry_satuan
const LaundrySatuan = sequelize.define('LaundrySatuan', {
    id_laundry_satuan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_layanan: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    waktu_pengerjaan: {
        type: DataTypes.ENUM('3 Jam', '5 jam', '1 hari', '2 Hari', '3 Hari', '1 minggu'),
        allowNull: false
    }
}, {
    tableName: 'tb_laundry_satuan',
    timestamps: false
}); 

module.exports = {
    LaundryNormal,
    LaundrySatuan
};
