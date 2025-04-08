import { DynamoDBClient, ReturnValue } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    ScanCommand,
    UpdateCommand,
    DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { ReadingListItem } from '@/types';

// Configure AWS
const client = new DynamoDBClient({
    region: process.env.BLOG_REGION,
    credentials: {
        accessKeyId: process.env.ADMIN_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.ADMIN_SECRET_ACCESS_KEY || ''
    }
});

const dynamoDB = DynamoDBDocumentClient.from(client);
const READING_LIST_TABLE = process.env.READING_LIST_TABLE || '';

export async function getReadingListItem(id: string): Promise<ReadingListItem | null> {
    const params = {
        TableName: READING_LIST_TABLE,
        Key: { id }
    };

    try {
        const result = await dynamoDB.send(new GetCommand(params));
        return result.Item as ReadingListItem || null;
    } catch (error) {
        console.error('Error fetching reading list item:', error);
        return null;
    }
}

export async function listReadingItems(): Promise<ReadingListItem[]> {
    const params = {
        TableName: READING_LIST_TABLE
    };

    try {
        const result = await dynamoDB.send(new ScanCommand(params));
        return (result.Items || []) as ReadingListItem[];
    } catch (error) {
        console.error('Error listing reading items:', error);
        return [];
    }
}

export async function createReadingListItem(item: Omit<ReadingListItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ReadingListItem | null> {
    const now = new Date().toISOString();
    const newItem: ReadingListItem = {
        id: crypto.randomUUID(),
        ...item,
        createdAt: now,
        updatedAt: now
    };

    const params = {
        TableName: READING_LIST_TABLE,
        Item: newItem
    };

    try {
        await dynamoDB.send(new PutCommand(params));
        return newItem;
    } catch (error) {
        console.error('Error creating reading list item:', error);
        return null;
    }
}

export async function updateReadingListItem(
    id: string,
    updates: Partial<Omit<ReadingListItem, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ReadingListItem | null> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: string | number } = {};

    Object.entries(updates).forEach(([key, value]) => {
        updateExpressions.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = value;
    });

    // Add updatedAt
    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const params = {
        TableName: READING_LIST_TABLE,
        Key: { id },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: ReturnValue.ALL_NEW
    };

    try {
        const result = await dynamoDB.send(new UpdateCommand(params));
        return result.Attributes as ReadingListItem;
    } catch (error) {
        console.error('Error updating reading list item:', error);
        return null;
    }
}

export async function deleteReadingListItem(id: string): Promise<boolean> {
    const params = {
        TableName: READING_LIST_TABLE,
        Key: { id }
    };

    try {
        await dynamoDB.send(new DeleteCommand(params));
        return true;
    } catch (error) {
        console.error('Error deleting reading list item:', error);
        return false;
    }
}