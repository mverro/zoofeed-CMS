const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");



const app = express();
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
// const port = process.env.PORT || 3000;

const { Client } = require('pg');

const client = new Client({
  user: 'default',
  host: 'ep-tight-voice-970578-pooler.ap-southeast-1.postgres.vercel-storage.com',
  database: 'verceldb',
  password: 'BwfVY9tc7rKX',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Koneksi berhasil!');
  })
  .catch((error) => {
    console.error('Koneksi gagal:', error);
  });




app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// app.listen(port, () => {
//   console.log(`App listen on port ${port}`);
// });

module.exports = app;