const express = require('express');
const body_parser = require('body-parser');
const userRouter = require('./routers/user.router');
const TodoRouter = require('./routers/todo.router');
const userControlRouter = require('./routers/userControl.router');

const app = express();

app.use(body_parser.json());

app.use('/',userRouter);
app.use('/',TodoRouter);
app.use('/',userControlRouter);

module.exports = app;