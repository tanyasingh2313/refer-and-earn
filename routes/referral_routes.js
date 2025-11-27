const express = require('express');
const router = express.Router();

const { apply_referral } = require('../controllers/referral_controller');

// POST /api/referral/apply
router.post('/apply', apply_referral);

module.exports = router;
