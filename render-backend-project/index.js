const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({path: './.env'});
const { DataSource } =require("typeorm");


const app = express();
const port = process.env.PORT || 3001;
const pgp = require('pg-promise')();

// Use the DATABASE_URL environment variable provided by Render.com
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const pool = new DataSource({
//     type: "postgres",
//     host: process.env.HOSTNAME,
//     port: 5432,
//     username: process.env.USERNAME,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE_NAME,
//     // entities: [__dirname + '/../**/*.entity.js'],
//     synchronize: true,
//   });

// const pool = pgp(process.env.HOST);
const pool = new Pool({
  user:process.env.USERNAME,
  host:process.env.HOSTNAME,
  database:process.env.DATABASE_NAME,
  password:process.env.PASSWORD,
  port:process.env.DB_PORT,
  ssl:true
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});



// Handle form submissions and store data in the database
app.post('/api/submit-form', async (req, res) => {
    console.log("hellow world")
    const { name, email } = req.body;
  
    try {
      const client = await pool.connect();
      const query = 'INSERT INTO form_data (name, email) VALUES ($1, $2) RETURNING *';
      const values = [name, email];
      const result = await client.query(query, values);
  
      res.json(result.rows[0]);
      client.release();
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Fetch all form submissions from the database
  app.get('/api/get-form-submissions', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM form_data');
      res.json(result.rows);
      client.release();
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(process.env.USERNAME)
  console.log("hello test")
});