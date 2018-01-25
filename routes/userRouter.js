const express = require('express');
const router = express.Router();

router.get('/', () => {console.log('into users route')});

module.exports = router;