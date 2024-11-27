require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Importa il modello Movie
const Movie = require('./models/Movie');

const app = express();

// Leggi l'URI dal file .env
const mongoUri = "mongodb://localhost:27017/streaming-app";

// Verifica che MONGO_URI sia definito
if (!mongoUri) {
  console.error('Errore: MONGO_URI non è definito nel file .env');
  process.exit(1); // Termina il server
}

// Connetti a MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connesso a MongoDB!'))
  .catch(err => {
    console.error('Errore di connessione:', err.message);
    process.exit(1); // Termina il server in caso di errore
  });

// Middleware per gestire JSON
app.use(express.json());

// Rotte API

// 1. Restituisce tutti i film dal database
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find(); // Recupera tutti i film
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Errore durante il recupero dei film' });
  }
});

// 2. Aggiunge un nuovo film al database
app.post('/api/movies', async (req, res) => {
  try {
    const { title, description, poster, genre } = req.body;

    if (!title || !description || !poster || !genre) {
      return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
    }

    const newMovie = new Movie({ title, description, poster, genre });
    await newMovie.save(); // Salva il film nel database
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: 'Errore durante il salvataggio del film' });
  }
});

// Aggiungi la directory client per servire i file statici
app.use(express.static(path.join(__dirname, '../client')));

// Route per servire il file index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Avvia il server
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
