import dotenv from 'dotenv';

import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

dotenv.config();

const spacesEndpoint = new aws.Endpoint(process.env.ENDPOINT);

export const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    // secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log('file', file);
      cb(null, file.originalname);
    },
  }),
}).array('upload', 1);
