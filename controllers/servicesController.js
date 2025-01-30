const { LaundryNormal, LaundrySatuan } = require('../models/servicesModels');

// Fungsi untuk mengambil layanan normal
const getLayananNormal = async (req, res) => {
  try {
    const layananNormal = await LaundryNormal.findAll();
    res.status(200).json(layananNormal);
  } catch (error) {
    console.error('Error fetching normal services:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk mengambil layanan satuan
const getLayananSatuan = async (req, res) => {
  try {
    const layananSatuan = await LaundrySatuan.findAll();
    res.status(200).json(layananSatuan);
  } catch (error) {
    console.error('Error fetching unit services:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk menambahkan layanan normal
const addLayananNormal = async (req, res) => {
  try {
    const { nama_layanan, harga, waktu_pengerjaan } = req.body;
    // Generate ID untuk layanan normal
    const newID = generateLaundryNormalID();
    const newService = await LaundryNormal.create({
      id_layanan: newID,  // Menambahkan ID yang sudah digenerate
      nama_layanan,
      harga,
      waktu_pengerjaan,
    });
    res.status(201).json({ message: 'Layanan Normal berhasil ditambahkan', data: newService });
  } catch (error) {
    console.error('Error adding normal service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk menambahkan layanan satuan
const addLayananSatuan = async (req, res) => {
  try {
    const { nama_layanan, harga, waktu_pengerjaan } = req.body;
    // Generate ID untuk layanan satuan
    const newID = generateLaundrySatuanID();
    const newService = await LaundrySatuan.create({
      id_layanan: newID,  // Menambahkan ID yang sudah digenerate
      nama_layanan,
      harga,
      waktu_pengerjaan,
    });
    res.status(201).json({ message: 'Layanan Satuan berhasil ditambahkan', data: newService });
  } catch (error) {
    console.error('Error adding unit service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk mengedit layanan normal
const editLayananNormal = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await LaundryNormal.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Layanan Normal tidak ditemukan' });
    }
    service.nama_layanan = req.body.nama_layanan || service.nama_layanan;
    service.harga = req.body.harga || service.harga;
    service.waktu_pengerjaan = req.body.waktu_pengerjaan || service.waktu_pengerjaan;
    
    await service.save();
    res.status(200).json({ message: 'Layanan Normal berhasil diperbarui', data: service });
  } catch (error) {
    console.error('Error updating normal service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk mengedit layanan satuan
const editLayananSatuan = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await LaundrySatuan.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Layanan Satuan tidak ditemukan' });
    }
    service.nama_layanan = req.body.nama_layanan || service.nama_layanan;
    service.harga = req.body.harga || service.harga;
    service.waktu_pengerjaan = req.body.waktu_pengerjaan || service.waktu_pengerjaan;
    
    await service.save();
    res.status(200).json({ message: 'Layanan Satuan berhasil diperbarui', data: service });
  } catch (error) {
    console.error('Error updating unit service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk menghapus layanan normal
const deleteLayananNormal = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await LaundryNormal.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Layanan Normal tidak ditemukan' });
    }
    await service.destroy();
    res.status(200).json({ message: 'Layanan Normal berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting normal service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk menghapus layanan satuan
const deleteLayananSatuan = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await LaundrySatuan.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Layanan Satuan tidak ditemukan' });
    }
    await service.destroy();
    res.status(200).json({ message: 'Layanan Satuan berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting unit service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fungsi untuk menghasilkan ID laundry normal
function generateLaundryNormalID() {
  return 'LN-' + (Math.floor(Math.random() * 1000) + 1).toString().padStart(3, '0');
}

// Fungsi untuk menghasilkan ID laundry satuan
function generateLaundrySatuanID() {
  return 'LS-' + (Math.floor(Math.random() * 100) + 1).toString().padStart(2, '0');
}

module.exports = {
  getLayananNormal,
  getLayananSatuan,
  addLayananNormal,
  addLayananSatuan,
  editLayananNormal,
  editLayananSatuan,
  deleteLayananNormal,
  deleteLayananSatuan,
  generateLaundrySatuanID,
  generateLaundryNormalID,
};
