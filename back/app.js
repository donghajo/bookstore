const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = 3001;
const cors = require('cors');

const errorController = require('./src/controllers/errorController');
const userRouter = require('./src/routers/userRouter');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride());

//router
app.use('/', userRouter);

//error handler
app.use(errorController.pageNotFountError);
app.use(errorController.respondInternalError);


app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
})