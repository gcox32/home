import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { rateLimit } from '@/utils/rate-limit';

const ses = new SESClient({
    region: process.env.BLOG_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.ADMIN_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.ADMIN_SECRET_ACCESS_KEY || ''
    }
});

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function validateInput(data: ContactFormData): ValidationResult {
  const errors: string[] = [];

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Invalid email address');
  }

  // Name validation
  if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10 || data.message.trim().length > 5000) {
    errors.push('Message must be between 10 and 5000 characters');
  }

  // Check for potential spam patterns
  if (data.message && (
    data.message.includes('http://') || 
    data.message.includes('https://') ||
    /\b(?:viagra|casino|lottery)\b/i.test(data.message)
  )) {
    errors.push('Message contains prohibited content');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
});

export async function POST(request: Request) {
    try {
        // Rate limiting
        try {
            await limiter.check(request, 3, 'CONTACT_FORM'); // 3 requests per minute
        } catch {
            return Response.json(
                { message: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        const data = await request.json();
        
        // Validation
        const validation = validateInput(data);
        if (!validation.isValid) {
            return Response.json(
                { message: 'Validation failed', errors: validation.errors },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedData = {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            message: data.message.trim()
        };

        const params = {
            Source: process.env.SES_VERIFIED_EMAIL || '',
            Destination: {
                ToAddresses: [process.env.SES_VERIFIED_EMAIL].filter((email): email is string => !!email)
            },
            Message: {
                Subject: {
                    Data: `New Contact Form Submission from ${sanitizedData.name}`
                },
                Body: {
                    Text: {
                        Data: `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\n\nMessage:\n${sanitizedData.message}`
                    }
                }
            },
            ReplyToAddresses: [sanitizedData.email]
        };

        await ses.send(new SendEmailCommand(params));

        return Response.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return Response.json(
            { message: 'Failed to send email' },
            { status: 500 }
        );
    }
} 