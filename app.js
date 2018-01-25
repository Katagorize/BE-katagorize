const express = require('express');
const app = express();
const apiRouter = require('./routes');

app.use('/api', apiRouter);

app.listen(3000, () => {console.log('listening on 3000...')});