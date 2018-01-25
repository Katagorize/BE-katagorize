const express = require('express');
const router = express.Router();

router.get('/', () => {console.log('into katas route')});

module.exports = router;