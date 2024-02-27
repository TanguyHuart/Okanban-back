/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const cors = require('cors');
const bodySanitizer = require('./app/middlewares/body-sanitizer.js')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(express.json());

// on configure la CORS policy
// on précise entre parenthese les origin des requete que l'on accepte
// nous on va accepter toutes le requetes qui vienne de partout
app.use(cors('*'));
app.use(bodySanitizer);

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});