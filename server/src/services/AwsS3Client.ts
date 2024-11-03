import { S3Client } from "@aws-sdk/client-s3";

export const s3clientservice = new S3Client({
    region: process.env.AWS_REGION,
    endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });