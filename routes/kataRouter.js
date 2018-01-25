const express = require('express');
const router = express.Router();
const {getAllKatas, getSingleKata} = require('../controllers');

router.get('/', getAllKatas);
router.get('/:kata_name', getSingleKata);

module.exports = router;