const express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser, getSingleScore} = require('../controllers');

router.get('/', getAllUsers);
router.get('/:user_name', getSingleUser);
router.get('/:user_name/katas/:kata_name/test', getSingleScore);

module.exports = router;