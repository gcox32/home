import { S3Client, DeleteObjectsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.BLOG_REGION,
  credentials: {
    accessKeyId: process.env.ADMIN_ACCESS_KEY_ID!,
    secretAccessKey: process.env.ADMIN_SECRET_ACCESS_KEY!
  }
});

export async function deleteS3FolderContents(prefix: string) {
  try {
    // List all objects with the given prefix
    const listCommand = new ListObjectsV2Command({
      Bucket: 'letmedemo-assets',
      Prefix: prefix
    });

    const listedObjects = await s3Client.send(listCommand);
    
    if (!listedObjects.Contents?.length) {
      return;
    }

    // Delete all found objects
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: 'letmedemo-assets',
      Delete: {
        Objects: listedObjects.Contents.map(({ Key }) => ({ Key }))
      }
    });

    await s3Client.send(deleteCommand);
  } catch (error) {
    console.error('Error deleting S3 folder contents:', error);
    throw error;
  }
} 