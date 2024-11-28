import express from "express";
import mysql from "mysql2/promise";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MySQL connection configuration (replace with your credentials)
const db = await mysql.createConnection({
  host: "your_database_host",
  user: "your_database_user",
  password: "your_database_password",
  database: "contact_form_db",
});

try {
  await db.connect();
  console.log("Connected to MySQL");
} catch (err) {
  console.error("Error connecting to MySQL:", err);
}

app.post("/submit-contact", async (req, res) => {
  const { firstName, lastName, email, countryCode, phoneNumber } = req.body;
  const customerType = determineCustomerType(req);

  try {
    const [result] = await db.execute(
      "INSERT INTO contacts (first_name, last_name, email, country_code, phone_number, customer_type) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, email, countryCode, phoneNumber, customerType]
    );
    console.log("Contact form submitted successfully!", result);
    res.status(200).send("Contact form submitted successfully!");
  } catch (err) {
    console.error("Error inserting data into MySQL:", err);
    res.status(500).send("Error submitting contact form.");
  }
});

// Example function to determine customer type (replace with your own logic)
function determineCustomerType(req) {
  if (req.body.source === "referral") {
    return "Referral";
  } else {
    return "Direct";
  }
}

const port = process.env.PORT || 3000; // Use Netlify's port or 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
