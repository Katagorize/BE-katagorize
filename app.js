console.log(process.env.PORT, 'THIS IS MY PORT')

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = require('./config').PORT;
const express = require('express');
const app = express();
const morgan = require('morgan');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api', apiRouter);



app.listen(PORT, () => {console.log(`listening on ${PORT}...`);});

module.exports = app;