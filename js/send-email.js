const nodemailer = require('nodemailer');
require('dotenv').config();

// Handler for the Netlify serverless function
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Parse the incoming request body
  const formData = JSON.parse(event.body);

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
  });

  // Construct email message
  const messageContent = `
    New Contact Form Submission:
    
    Name: ${formData.first_name} ${formData.last_name}
    Email: ${formData.email}
    Phone: ${formData.country_code} ${formData.phone}
    Message: ${formData.message}
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: 'New Contact Form Submission',
      text: messageContent,
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: info.messageId })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
}; 