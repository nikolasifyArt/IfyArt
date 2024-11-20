import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { firstName, lastName, email, phone, notes } = JSON.parse(event.body || '{}') as FormData;

    // Create a transporter using SMTP
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Setup email data
    let mailOptions = {
      from: '"Your Website" <your-email@gmail.com>',
      to: 'recipient@example.com', // Replace with the specific Gmail address
      subject: 'New Contact Form Submission',
      text: `
        New contact form submission:
        
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Phone: ${phone}
        Notes: ${notes}
      `
    };

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error processing request" })
    };
  }
};

export { handler };

// For testing purposes
const testEvent: HandlerEvent = {
  httpMethod: 'POST',
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: `${process.env.EMAIL_USER}`,
    phone: `${process.env.EMAIL_PASS}`,
    notes: `${process.env.EMAIL_massage}`
  }),
  headers: {},
  isBase64Encoded: false,
  rawUrl: '',
  rawQuery: ''
};

const testContext: HandlerContext = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'send-email',
  functionVersion: '1.0',
  invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:send-email',
  memoryLimitInMB: '128',
  awsRequestId: '123456789',
  logGroupName: '/aws/lambda/send-email',
  logStreamName: '2021/01/01/[$LATEST]123456789',
  identity: undefined,
  clientContext: undefined
};

handler(testEvent, testContext)
  .then(response => console.log('Test response:', response))
  .catch(error => console.error('Test error:', error));