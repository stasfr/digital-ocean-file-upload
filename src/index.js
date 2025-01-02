import dotenv from 'dotenv';
import express from 'express';
import { s3 } from './s3.js';

dotenv.config();

const app = express();

app.use(express.static('public'));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post('/upload', async function (request, response) {
  const formData = await request.formData();
  const file = formData.get('file');

  console.log(file);

  s3.putObject({
    Bucket: process.env.BUCKET,
    Key: 'original_file_name.pdf',
    Body: readStream,
    acl: 'public-read',
  });

  // upload(request, response, function (error) {
  //   if (error) {
  //     console.log(error);
  //     return response.json('/error');
  //   }
  //   console.log('File uploaded successfully.');
  //   response.json('/success');
  // });
});

app.listen(3001, function () {
  console.log('Server listening on port 3001.');
});
