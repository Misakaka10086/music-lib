"use server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "auto",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  endpoint: process.env.R2_ENDPOINT!,
});

export async function getSignedImageUrl(bucketName: string, objectKey: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL有效期1小时
  return url;
} 