import * as dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import multer from 'multer';

import { FileStorageAdapter } from './service/file-storage-adapter.service';

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(express.static('public'));

app.get('/', function (request: Request, response: Response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/heartbeat', function (request: Request, response: Response) {
  response.json({
    message: 'Hello World!',
  });
});

app.post(
  '/upload',
  upload.single('file'),
  async function (request: Request, response: Response) {
    try {
      if (!request.file) {
        response.status(400).send('No file uploaded.');
        return;
      }
      const fileStorageAdapter = new FileStorageAdapter();

      const data = request.file;

      const blob = new Blob([data.buffer]);
      const file = new File([blob], data.originalname, { type: data.mimetype });

      const result = await fileStorageAdapter.processFile({
        file,
        email: 'example@example.com',
      });

      console.log(result);

      response.json({
        message: 'Hello World!',
      });
    } catch (error) {
      console.log(error);

      response.status(500).json({
        error,
      });
    }
  }
);

const PORT: string = process.env.PORT || '3000';

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
