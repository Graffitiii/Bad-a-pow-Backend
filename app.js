const express = require('express');
const body_parser = require('body-parser');
const userRouter = require('./routers/user.router');
const userControlRouter = require('./routers/userControl.router');
const EventRouter = require('./routers/event.router');
const ClubRouter = require('./routers/club.router');
const ReviewRouter = require('./routers/review.router');
const HistoryRouter = require('./routers/history.router');
const app = express();

app.use(body_parser.json());

app.use('/',userRouter);
app.use('/',userControlRouter);
app.use('/',EventRouter);
app.use('/',ClubRouter);
app.use('/',ReviewRouter);
app.use('/',HistoryRouter)

module.exports = app;