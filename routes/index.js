const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const kataRouter = require('./kataRouter');

// router.get('/', () => {console.log('into api')});
router.use('/users', userRouter);
router.use('/katas', kataRouter);

module.exports = router;