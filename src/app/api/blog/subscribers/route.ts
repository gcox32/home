import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { BlogSubscriber } from '@/types';

const BLOG_SUBSCRIBER_TABLE = process.env.BLOG_SUBSCRIBER_TABLE || '';

const ddb = DynamoDBDocument.from(new DynamoDB({
    region: process.env.BLOG_REGION,
    credentials: {
        accessKeyId: process.env.ADMIN_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.ADMIN_SECRET_ACCESS_KEY || ''
    }
}));

export async function GET() {
    try {
        const result = await ddb.scan({
            TableName: BLOG_SUBSCRIBER_TABLE
        });

        const subscribers = (result.Items || []) as BlogSubscriber[];
        
        // Sort by subscribedAt date, newest first
        subscribers.sort((a, b) => 
            new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
        );

        return Response.json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return Response.json(
            { message: 'Failed to fetch subscribers' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return Response.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        await ddb.delete({
            TableName: BLOG_SUBSCRIBER_TABLE,
            Key: { email }
        });

        return Response.json(
            { message: 'Subscriber deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        return Response.json(
            { message: 'Failed to delete subscriber' },
            { status: 500 }
        );
    }
} 