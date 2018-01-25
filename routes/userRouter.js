const express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser} = require('../controllers');

router.get('/', getAllUsers);
router.get('/:user_name', getSingleUser);

module.exports = router;