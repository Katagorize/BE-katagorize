const express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser} = require('../controllers/users');
const  {getSingleScore, writeCodeToFile, fetchTests} = require('../controllers/scores');

router.get('/', getAllUsers);
router.get('/:user_name', getSingleUser);
router.get('/:user_name/katas/:kata_name/test', getSingleScore);
router.get('/:user_name/katas/:kata_name/test2', fetchTests)

module.exports = router;