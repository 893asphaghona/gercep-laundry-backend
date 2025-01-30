const express = require('express');
const router = express.Router();
const {
  getLayananNormal,
  getLayananSatuan,
  addLayananNormal,
  addLayananSatuan,
  editLayananNormal,
  editLayananSatuan,
  deleteLayananNormal,
  deleteLayananSatuan,
} = require('../controllers/servicesController');

router.get('/layanan-normal', getLayananNormal);
router.get('/layanan-satuan', getLayananSatuan);
router.post('/layanan-normal', addLayananNormal);
router.post('/layanan-satuan', addLayananSatuan);

// Route untuk mengedit layanan normal dan satuan
router.put('/layanan-normal/:id', editLayananNormal);
router.put('/layanan-satuan/:id', editLayananSatuan);

// Route untuk menghapus layanan normal dan satuan
router.delete('/layanan-normal/:id', deleteLayananNormal);
router.delete('/layanan-satuan/:id', deleteLayananSatuan);

module.exports = router;
