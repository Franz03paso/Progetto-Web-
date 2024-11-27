const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
  const search = req.query.search || '';
  const movies = await Movie.find({ title: new RegExp(search, 'i') });
  res.json(movies);
});

module.exports = router;
