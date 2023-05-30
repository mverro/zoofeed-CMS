const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialectModule: require('pg')
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);



module.exports = app;