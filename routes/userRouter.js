const express = require('express');
const router = express.Router();
const {getAllUsers, getSingleUser, addUser, userLogin} = require('../controllers/users');
const  {getSingleScore} = require('../controllers/scores');

router.get('/', getAllUsers);
router.route('/:user_name')
  .get(getSingleUser)
  .post(addUser);
router.get('/:user_name/signin', userLogin);
router.get('/:user_name/katas/:kata_name/test', getSingleScore);

module.exports = router;