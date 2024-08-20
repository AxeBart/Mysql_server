import express from 'express'
import { addUser, updateUser, deleteUser, findUser } from './MysqlServer/users.js';
import cors from 'cors'

const app = express();
const port = 3000;
const api_key = 'MMA'

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send({status : "success"})
    res.end()
});

app.post('/adduser', (req, res) => {
    const apiKey = req.get('x-api-key')
    if (apiKey == api_key) {
        addUser(req.body, (r) => {
            res.send(r)
            res.end()
        })
    } else {
        res.send({ error: 'bad api key' })
        res.end()
    }
});

app.post('/updateuser', (req, res) => {
    const apiKey = req.get('x-api-key')
    if (apiKey == api_key) {
        updateUser(req.body, (r) => {
            res.send(r)
            res.end()
        })
    } else {
        res.send({ error: 'bad api key' })
        res.end()
    }
});

app.post('/finduser', (req, res) => {
    const apiKey = req.get('x-api-key')
    if (apiKey == api_key) {
        findUser(req.body, (r) => {
            res.send(r)
            res.end()
        })
    } else {
        res.send({ error: 'bad api key' })
        res.end()
    }
});

app.post('/deleteuser', (req, res) => {
    const apiKey = req.get('x-api-key')
    if (apiKey == api_key) {
        deleteUser(req.body, (r) => {
            res.send(r)
            res.end()
        })
    } else {
        res.send({ error: 'bad api key' })
        res.end()
    }
});

app.get('/createdb', (req, res) => {
    const sql = 'CREATE DATABASE IF NOT EXISTS testdb';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Base de données créée');
    });
});

// Route pour créer une table
app.get('/createtable', (req, res) => {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255)
    )
  `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Table users créée');
    });
});

// Route pour insérer des données

// Route pour sélectionner les données
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Démarrer le serveur
app.listen( process.env.PORT || port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
