import { ServerClient } from "postmark";

const client = new ServerClient("d91a8442-714f-43ea-ad09-78a3da6c47e0");

export function sendContactEmail(name, email, message) {
  client.sendEmailWithTemplate({
    "From": "sender@example.com",
    "To": "bigbosssnakeify@gmail.com, ifyart@nikolasifyart.org",
    "TemplateAlias": "code-your-own-1",
    "TemplateModel": {
      "name": name,
      "email": email,
      "message": message
    }
  });
}

export function sendReplyEmail(email) {
  client.sendEmail({
    "From": "sender@example.com",
    "To": email,
    "Subject": "Thank you for contacting us",
    "TextBody": "We have received your message and will get back to you shortly."
  });
}