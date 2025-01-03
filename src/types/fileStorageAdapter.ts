export type FileStorageAdapterParams = {
  file: File;
  email: string;
};

export type ProcessingStatus =
  | 'pending'
  | 'in progress'
  | 'completed'
  | 'failed';

export type DBFilePayload = {
  fileName: string;
  s3URL: string;
  uploadDate: number;
  status: ProcessingStatus;
  processingError: string | undefined;
};
