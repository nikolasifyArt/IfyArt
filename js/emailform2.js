const nodemailer = require("nodemailer");
// Import path module to handle file paths correctly
const path = require("path"); // <-- This should import the 'path' module, not the .env file
// Configure dotenv with the correct path to .env file in parent directory
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.SMTP_PASSWORD,

  },
});

// Create an Express route to handle the email sending
app.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, countryCode, phone, message } = req.body;

    const mailOptions = {
        from: {
            name: `${firstName} ${lastName}`,
            address: process.env.EMAIL_USER
        },
        to: process.env.EMAIL_TO,
        subject: 'New Contact Form Submission',
        text: `
            Name: ${firstName} ${lastName}
            Email: ${email}
            Phone: ${countryCode}${phone}
            Message: ${message}
        `,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${countryCode}${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
