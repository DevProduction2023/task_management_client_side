const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createBooking, getMyBookings } = require('../controllers/bookingController');

router.post('/', auth, createBooking);
router.get('/my', auth, getMyBookings);

module.exports = router;
