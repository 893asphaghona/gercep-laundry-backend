const Order = require('../models/orderModels');
const { LaundryNormal, LaundrySatuan } = require('../models/servicesModels');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addOrder = async (req, res) => {
    const {
        nama,
        no_whatsapp,
        alamat,
        jenis_layanan,
        detail_layanan,
        waktu_pengerjaan,
        tanggal_pesanan,
        berat_pakaian,
        status_pesanan
    } = req.body;

    try {
        if (berat_pakaian <= 0) {
            return res.status(400).json({ message: 'Berat pakaian harus lebih dari 0' });
        }

        const layanan = jenis_layanan === 'normal'
            ? await LaundryNormal.findOne({ where: { nama_layanan: detail_layanan } })
            : await LaundrySatuan.findOne({ where: { nama_layanan: detail_layanan } });

        if (!layanan) {
            return res.status(404).json({ message: 'Layanan tidak ditemukan' });
        }

        const total_harga = berat_pakaian * layanan.harga;

        const newOrder = await Order.create({
            nama,
            no_whatsapp,
            alamat,
            jenis_layanan,
            detail_layanan,
            waktu_pengerjaan,
            tanggal_pesanan,
            total_harga,
            status_pesanan,
            berat_pakaian
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//edit
exports.updateOrder = async (req, res) => {
  const { id_pesanan } = req.params;
  const {
    nama,
    no_whatsapp,
    alamat,
    jenis_layanan,
    detail_layanan,
    waktu_pengerjaan,
    tanggal_pesanan,
    berat_pakaian,
    status_pesanan
  } = req.body;

  try {
    // Cari pesanan berdasarkan ID
    const order = await Order.findByPk(id_pesanan);

    if (!order) {
      return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }

    // Dapatkan harga layanan berdasarkan jenis dan detail layanan
    let layanan;
    if (jenis_layanan === 'normal') {
      layanan = await LaundryNormal.findOne({ where: { nama_layanan: detail_layanan } });
    } else if (jenis_layanan === 'satuan') {
      layanan = await LaundrySatuan.findOne({ where: { nama_layanan: detail_layanan } });
    }

    if (!layanan) {
      return res.status(404).json({ message: 'Layanan tidak ditemukan' });
    }

    // Hitung ulang total harga berdasarkan berat pakaian dan harga layanan
    const total_harga = berat_pakaian * layanan.harga;

    // Update data pesanan
    order.nama = nama;
    order.no_whatsapp = no_whatsapp;
    order.alamat = alamat;
    order.jenis_layanan = jenis_layanan;
    order.detail_layanan = detail_layanan;
    order.waktu_pengerjaan = waktu_pengerjaan;
    order.tanggal_pesanan = tanggal_pesanan;
    order.berat_pakaian = berat_pakaian;
    order.total_harga = total_harga;  // Update total harga
    order.status_pesanan = status_pesanan;

    // Simpan perubahan
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id_pesanan } = req.params;

  try {
    // Cari pesanan berdasarkan ID
    const order = await Order.findByPk(id_pesanan);
    if (!order) {
      return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }

    // Hapus pesanan
    await order.destroy();

    res.status(200).json({ message: 'Pesanan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan total pendapatan pesanan selesai berdasarkan tanggal
exports.getTotalPendapatan = async (req, res) => {
  try {
    const { tanggal } = req.query;
    const orders = await Order.findAll({
      where: {
        status_pesanan: 'selesai',
        tanggal_pesanan: tanggal
      },
    });

    const totalPendapatan = orders.reduce((sum, order) => sum + parseFloat(order.total_harga), 0);
    res.json({ totalPendapatan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
