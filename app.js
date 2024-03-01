const express = require('express');
const body_parser = require('body-parser');
const userRouter = require('./routers/user.router');
const EventRouter = require('./routers/event.router');
const ClubRouter = require('./routers/club.router');

const app = express();

app.use(body_parser.json());

app.use('/',userRouter);
app.use('/',EventRouter);
app.use('/',ClubRouter);

module.exports = app;