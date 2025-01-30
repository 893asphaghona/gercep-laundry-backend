const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Order = sequelize.define('Order', {
    id_pesanan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    no_whatsapp: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    alamat: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    jenis_layanan: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    detail_layanan: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    waktu_pengerjaan: {
        type: DataTypes.ENUM('3 Jam', '5 Jam', '1 Hari', '2 Hari', '3 Hari', '1 Minggu'),
        allowNull: false
    },
    tanggal_pesanan: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status_pesanan: {
        type: DataTypes.ENUM('pending', 'selesai', 'batal'),
        defaultValue: 'pending'
    },
    berat_pakaian: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tb_pesanan',
    timestamps: false
});

module.exports = Order;
