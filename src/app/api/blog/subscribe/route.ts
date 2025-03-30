import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const BLOG_SUBSCRIBER_TABLE = process.env.BLOG_SUBSCRIBER_TABLE || '';

const ddb = DynamoDBDocument.from(new DynamoDB({
    region: process.env.BLOG_REGION,
    credentials: {
        accessKeyId: process.env.ADMIN_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.ADMIN_SECRET_ACCESS_KEY || ''
    }
}));

export async function POST(request: Request) {
    try {
        const { email, source } = await request.json();

        if (!email || !email.includes('@')) {
            return Response.json(
                { message: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Check if already subscribed
        const existingSubscriber = await ddb.get({
            TableName: BLOG_SUBSCRIBER_TABLE,
            Key: { email }
        });

        if (existingSubscriber.Item) {
            return Response.json(
                { status: 'already-subscribed', message: 'Email already subscribed' },
                { status: 200 }
            );
        }

        // Add new subscriber
        await ddb.put({
            TableName: BLOG_SUBSCRIBER_TABLE,
            Item: {
                email,
                subscribedAt: new Date().toISOString(),
                source: source || ''
            }
        });

        return Response.json(
            { status: 'success', message: 'Successfully subscribed' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Subscription error:', error);
        return Response.json(
            { message: 'Failed to process subscription' },
            { status: 500 }
        );
    }
}
