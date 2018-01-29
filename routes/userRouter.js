const express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser} = require('../controllers/users');
const  {getSingleScore} = require('../controllers/scores');

router.get('/', getAllUsers);
router.get('/:user_name', getSingleUser);
router.get('/:user_name/katas/:kata_name/test', getSingleScore);

module.exports = router;