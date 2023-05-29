const { Pool } = require('pg');
const dotenv = require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

pool.connect((err)=>{
    if (err) throw err
    console.log('connect success to Postgre');

})

module.exports = pool;