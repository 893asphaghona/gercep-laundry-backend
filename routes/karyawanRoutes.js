const express = require('express');
const { getKaryawan, addKaryawan, updateKaryawan, deleteKaryawan} = require('../controllers/karyawanController');
const router = express.Router();

// Rute untuk mengambil data karyawan
router.get('/', getKaryawan);

// Rute untuk menambahkan karyawan
router.post('/', addKaryawan);

router.put('/:id', updateKaryawan); // Untuk mengedit karyawan

router.delete('/:id', deleteKaryawan); // Untuk menghapus karyawan

module.exports = router;
