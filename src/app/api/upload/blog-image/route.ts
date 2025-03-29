import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.BLOG_REGION,
  credentials: {
    accessKeyId: process.env.ADMIN_ACCESS_KEY_ID!,
    secretAccessKey: process.env.ADMIN_SECRET_ACCESS_KEY!
  }
});

export async function PUT(request: Request) {
  try {
    const { fileName, fileType, slug } = await request.json();

    const key = `public/blog/${slug}/${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: 'letmedemo-assets',
      Key: key,
      ContentType: fileType,
      CacheControl: 'max-age=31536000',
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300
    });

    return NextResponse.json({ 
      uploadUrl: signedUrl,
      publicUrl: `https://assets.letmedemo.com/${key}`
    });
  } catch (error) {
    console.error('Pre-signed URL generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
