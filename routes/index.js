const express = require('express');

const router = express.Router({caseSensitive: true});
const userRouter = require('./userRouter');
const kataRouter = require('./kataRouter');

router.use('/users', userRouter);
router.use('/katas', kataRouter);

module.exports = router;