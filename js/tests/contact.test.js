const { sendContactEmail } = require('../emailform');

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockImplementation((mailOptions) => 
      Promise.resolve({ messageId: 'test-message-id' })
    )
  })
}));

describe('Contact Form Tests', () => {
  // Test form validation
  describe('Form Validation', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <form id="contactForm">
          <input id="first_name" type="text" />
          <input id="lname" type="text" />
          <input id="email" type="email" />
          <input id="phone" type="tel" />
          <textarea id="comment"></textarea>
          <button id="submit">Send</button>
        </form>
      `;
    });

    test('should validate required fields', () => {
      const form = document.getElementById('contactForm');
      expect(form.checkValidity()).toBeFalsy();
      
      // Fill required fields
      document.getElementById('first_name').value = 'John';
      document.getElementById('lname').value = 'Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('phone').value = '1234567890';
      
      expect(form.checkValidity()).toBeTruthy();
    });

    test('should validate email format', () => {
      const emailInput = document.getElementById('email');
      
      emailInput.value = 'invalid-email';
      expect(emailInput.checkValidity()).toBeFalsy();
      
      emailInput.value = 'valid@email.com';
      expect(emailInput.checkValidity()).toBeTruthy();
    });
  });

  // Test email sending functionality
  describe('Email Sending', () => {
    test('should send email with correct data', async () => {
      const testData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        country_code: '+1',
        phone: '1234567890',
        message: 'Test message'
      };

      const result = await sendContactEmail(testData);
      expect(result.success).toBeTruthy();
      expect(result.messageId).toBe('test-message-id');
    });

    test('should handle email sending errors', async () => {
      // Mock an error scenario
      const nodemailer = require('nodemailer');
      nodemailer.createTransport().sendMail.mockImplementationOnce(() => 
        Promise.reject(new Error('SMTP error'))
      );

      const testData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        country_code: '+1',
        phone: '1234567890',
        message: 'Test message'
      };

      const result = await sendContactEmail(testData);
      expect(result.success).toBeFalsy();
      expect(result.error).toBe('SMTP error');
    });
  });
});
