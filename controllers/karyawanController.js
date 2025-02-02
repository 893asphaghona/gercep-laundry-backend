const Karyawan = require('../models/modelKaryawan');

// Controller untuk mengambil data karyawan
const getKaryawan = async (req, res) => {
  try {
    const karyawan = await Karyawan.findAll();
    const karyawanData = karyawan.map(karyawan => karyawan.dataValues);  
    res.json(karyawanData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller untuk menambahkan data karyawan
const addKaryawan = async (req, res) => {
  const { nama, alamat, no_whatsapp, tanggal_masuk, gaji } = req.body;
  try {
    console.log({ nama, alamat, no_whatsapp, tanggal_masuk, gaji }); // Cek data yang diterima
    const newKaryawan = await Karyawan.create({
      nama,
      alamat,
      no_whatsapp,
      tanggal_masuk,
      gaji
    });
    res.json(newKaryawan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fungsi untuk mengedit data karyawan
const updateKaryawan = async (req, res) => {
  const { id } = req.params;
  const { nama, alamat, no_whatsapp, tanggal_masuk, gaji } = req.body;

  try {
    const karyawan = await Karyawan.findByPk(id);

    if (!karyawan) {
      return res.status(404).json({ message: 'Karyawan tidak ditemukan' });
    }

    await karyawan.update({
      nama,
      alamat,
      no_whatsapp,
      tanggal_masuk,
      gaji,
    });

    res.json(karyawan);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui data karyawan', error: error.message });
  }
};

// Fungsi untuk menghapus data karyawan
const deleteKaryawan = async (req, res) => {
  const { id } = req.params;

  try {
    const karyawan = await Karyawan.findByPk(id);

    if (!karyawan) {
      return res.status(404).json({ message: 'Karyawan tidak ditemukan' });
    }

    await karyawan.destroy();

    res.status(200).json({ message: 'Data karyawan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus data karyawan', error: error.message });
  }
};

module.exports = {
  getKaryawan,
  addKaryawan,
  updateKaryawan,
  deleteKaryawan,
};