const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/orders', orderController.getOrders);
router.post('/orders', orderController.addOrder);
router.put('/orders/:id_pesanan', orderController.updateOrder);
router.delete('/orders/:id_pesanan', orderController.deleteOrder);
router.get('/pendapatan', orderController.getTotalPendapatan);



module.exports = router;
