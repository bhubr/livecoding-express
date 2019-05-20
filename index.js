const express = require('express');
const bodyParser = require('body-parser');

const sports = [
  { id: 1, name: "Soccer" },
  { id: 2, name: "Tennis" },
  { id: 3, name: "Base-ball" }
];

const app = express();
app.use(bodyParser.json());

// GET all endpoint
app.get('/sports', (req, res) => res.send(sports));

// GET one endpoint
app.get('/sports/:id', (req, res) => {
  const sportId = Number(req.params.id);
  const sport = sports.find(item => item.id === sportId);
  if (!sport) {
    return res.status(404).json({
      error: 'Not Found'
    });
  }
  res.json(sport);
});

// POST endpoint
app.post('/sports', (req, res) => {
  const id = sports.length + 1;
  const newSport = { ...req.body, id };
  sports.push(newSport);
  res.status(201).json(newSport);
});

// PUT endpoint
app.put('/sports/:id', (req, res) => {
  const sportId = Number(req.params.id);
  const sportIndex = sports.findIndex(item => item.id === sportId);
  if (sportIndex === -1) {
    return res.status(404).json({
      error: 'Not Found'
    });
  }
  sports.splice(sportIndex, 1, req.body);
  res.json(req.body);
});

// DELETE endpoint
app.delete('/sports/:id', (req, res) => {
  const sportId = Number(req.params.id);
  const sportIndex = sports.findIndex(item => item.id === sportId);
  if (sportIndex === -1) {
    return res.status(404).json({
      error: 'Not Found'
    });
  }
  sports.splice(sportIndex, 1);
  res.sendStatus(204);
});

app.listen(8000);
