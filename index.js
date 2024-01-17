require('dotenv').config();
const express = require('express');
require('./app/helper/db');
const routes = require('./app/routes/route');
const bodyParser = require('body-parser');
const responseEnum = require('./app/utils/enum');
const { StatusCodes } = require('http-status-codes');
const { GeneralResponse } = require('./app/utils/response');
const message = require('./app/utils/message');

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./app/middleware/response'));
app.use(require('./app/middleware/error').handleJoiErrors);
app.use(require('./app/middleware/error').handleErrors);

routes.use((req, res, next) => {
  next(
    new GeneralResponse(
      responseEnum.ERROR,
      StatusCodes.NOT_FOUND,
      message.ROUTE_NOT_FOUND,
      null,
    ),
  );
});

const port = process.env.PORT || responseEnum.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});