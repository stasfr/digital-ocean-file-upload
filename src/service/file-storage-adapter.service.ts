import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type { PutObjectCommandInput } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

export class FileStorageAdapter {
  private readonly s3Client: S3Client;

  constructor() {
    dotenv.config();

    this.s3Client = new S3Client({
      endpoint: process.env.ENDPOINT,
      forcePathStyle: false,
      region: 'sfo3',
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
  }

  private async createParams(file: File): Promise<PutObjectCommandInput> {
    const buffer = Buffer.from(await file.arrayBuffer());

    return {
      Bucket: process.env.BUCKET,
      Key: `test/${file.name}`,
      Body: buffer,
      ACL: 'public-read-write',
    };
  }

  async uploadObject(file: File) {
    try {
      const params: PutObjectCommandInput = await this.createParams(file);
      const data = await this.s3Client.send(new PutObjectCommand(params));

      console.log(
        'Successfully uploaded object: ' + params.Bucket + '/' + params.Key
      );

      return data;
    } catch (err) {
      console.log('Error', err);
    }
  }
}
