import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  endpoint: process.env.ENDPOINT,
  forcePathStyle: false,
  region: 'sfo3',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export const uploadObject = async (file) => {
  try {
    const params = {
      Bucket: process.env.BUCKET,
      Key: 'test.pdf',
      Body: file,
      ACL: 'public-read-write',
    };

    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      'Successfully uploaded object: ' + params.Bucket + '/' + params.Key
    );

    return data;
  } catch (err) {
    console.log('Error', err);
  }
};
