import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type { PutObjectCommandInput } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import * as dotenv from 'dotenv';

import type { FileStorageAdapterParams } from '../types/fileStorageAdapter';
import type { DBFilePayload } from '../types/fileStorageAdapter';
import { getUnixDate } from '../utils/date';

export class FileStorageAdapter {
  private readonly s3Client: S3Client;
  private readonly defaultFilePath: string;

  constructor() {
    dotenv.config();

    this.defaultFilePath = 'test/';

    this.s3Client = new S3Client({
      endpoint: process.env.ENDPOINT,
      forcePathStyle: false,
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
  }

  async processFile(fileStorageAdapterParams: FileStorageAdapterParams) {
    const params = await this.createParams(fileStorageAdapterParams);
    return await this.uploadObject(params);
  }

  private async createParams({
    file,
    email,
  }: FileStorageAdapterParams): Promise<PutObjectCommandInput> {
    const buffer = Buffer.from(await file.arrayBuffer());

    const unixDate = getUnixDate();
    const uuid = crypto.randomUUID();

    const fileNameArray = file.name.split('.');
    const fileType = fileNameArray[fileNameArray.length - 1];

    const fileName = `${email}_${unixDate}_${uuid}.${fileType}`;

    return {
      Bucket: process.env.BUCKET,
      Key: this.defaultFilePath + fileName,
      Body: buffer,
      ACL: 'public-read-write',
    };
  }

  private async uploadObject(
    params: PutObjectCommandInput
  ): Promise<DBFilePayload> {
    try {
      const command = new PutObjectCommand(params);
      const data = await this.s3Client.send(command);

      const uploadStatus = data.$metadata.httpStatusCode;

      if (uploadStatus !== 200) throw new Error('Error in file uploading');

      console.log(
        'Successfully uploaded object: ' + params.Bucket + '/' + params.Key
      );

      return {
        fileName: params.Key,
        s3URL: `https://ggw-file-container.sfo3.cdn.digitaloceanspaces.com/${params.Key}`,
        uploadDate: getUnixDate(),
        status: 'pending',
        processingError: null,
      };
    } catch (error) {
      return error;
    }
  }
}
