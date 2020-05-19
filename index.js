const express = require('express')
const mysql = require('mysql')

const app = express()
const PORT = 8000

const db = mysql.createConnection(
    {
        host: '35.184.65.113',
        user: 'root',
        password: 'jdsakfidsajfklsñad56798416374',
        database: 'menu'
    }
) //end createConnection


db.connect((err) =>
{
    if (err)
    {
        throw err;
    } //end if
    console.log('Connected to database');
}) //end connect

global.db = db;

const {getPlato, newPlato, deletePlato, updatePlato} = require('./routes/controller.js')

app.get('/getPlato', getPlato)
app.post('/newPlato', newPlato)
app.post('/deletePlato', deletePlato)
app.post('/updatePlato', updatePlato)

app.listen(PORT, ()=>
{
    console.log('Server started at: http://localhost:8000')
}) //end listen
