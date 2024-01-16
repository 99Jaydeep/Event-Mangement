require('dotenv').config();
const express = require('express');
require('./app/helper/db')
const bodyParser = require('body-parser');
const responseEnum = require('./app/utils/enum');
const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./app/middleware/error').handleJoiErrors);
app.use(require('./app/middleware/error').handleErrors);

const port = process.env.PORT || responseEnum.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});