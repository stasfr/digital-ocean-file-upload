import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';

import { uploadObject } from './s3.js';

dotenv.config();

const app = express();

app.use(express.static('public'));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/heartbeat', function (request, response) {
  response.json({
    message: 'Hello World!',
  });
});

app.post('/upload', async function (request, response) {
  try {
    const file = fs.readFileSync('./test/file.pdf');

    console.log(file);

    uploadObject(file);

    response.json({
      message: 'Hello World!',
    });
  } catch (error) {
    response.status(500).json({
      error,
    });
  }
});

app.listen(3001, function () {
  console.log('Server listening on port 3001.');
});
