const serverless = require('serverless-http');
const express = require('express');
const handlers = require('./handlers');
const app = express();

app.use(express.json({ strict: false }));

app.get('/', handlers.root);

/**
 * Get all homes
 */
// app.get('/homes/:page?', handlers.getAll);

/**
 * Get a single home
 */
app.get('/home/:homeId', handlers.getSingle);

/**
 * Create homes via CSV upload
 */
// app.post('/homes', handlers.createMany);

/**
 * Create a single home via form
 */
app.post('/home', handlers.createSingle);

module.exports.handler = serverless(app);
