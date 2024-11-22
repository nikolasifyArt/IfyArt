import { ServerClient } from "postmark";

const client = new ServerClient("d91a8442-714f-43ea-ad09-78a3da6c47e0");

const emailData = {
  "TemplateId": 123456,
  "TemplateModel": {
    "name": "John Doe",
    "product": "Acme"
  },
  "InlineCss": true,
  "from": "sendermail@exmaple.com",
  "To": "sender@expmale.com",
  "Cc": "compied@example.com",
  "Bcc": "black-copied@exmple.com",
  "Tag": "FormSubmission",
  "replyTo": "reply@example.com",
  "Headers": [
    {
      "name": "CUSTOM-HEADER",
      "value": "value"
    }
  ],
  "TrackOpens": true,
  "TrackLinks": "None",
  "Attachments": [
    {
      "Name": "readme.txt",
      "Content": "dGVzdCBjb250ZW50",
      "ContentType": "text/plain"
    },
    {
      "Name": "report.pdf",
      "Content": "dGVzdCBjb250ZW50",
      "ContentType": "application/pdf"
    }
  ],
  "metaData": {
    "color": "blue",
    "client-id": "12345"
  },
  "MessageStream": "outbound"
};