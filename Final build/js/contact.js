// Constructor for the data structure
class CustomerData {
    constructor(firstName, lastName, email, phone, notes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.notes = notes;
    }
}

// Function to validate form fields
function validateForm(data) {
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        return false;
    }
    // Additional validation logic can be added here
    return true;
}

// Function to retrieve form data as JSON
function getFormDataAsJSON() {
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;

    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        notes: notes
    };

    return JSON.stringify([formData]);
}

// Function to generate table from JSON data
function generateTableFromJSON(jsonData) {
    const data = JSON.parse(jsonData);
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    let rowCount = table.rows.length;

    data.forEach(item => {
        let newRow = table.insertRow(rowCount++);

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);

        cell1.innerHTML = item.firstName;
        cell2.innerHTML = item.lastName;
        cell3.innerHTML = item.email;
        cell4.innerHTML = item.phone;
        cell5.innerHTML = item.notes;
    });
}

document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Validate form data
    if (!validateForm(data)) {
        alert("Sorry, something went wrong. Please double-check for any incorrect information you entered.");
        return;
    }

    // Create a new CustomerData object
    const customerData = new CustomerData(data.firstName, data.lastName, data.email, data.phone, data.notes || '');

    const jsonData = JSON.stringify(customerData);

    // Send jsonData to a Netlify function
    try {
        const response = await fetch('/.netlify/functions/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });

        if (response.ok) {
            alert("Form submitted successfully!");
        } else {
            alert("Sorry, something went wrong. Please try again later.");
        }
    } catch (error) {
        alert("Sorry, something went wrong. Please try again later.");
    }

    // Generate table from JSON data
    const formJsonData = getFormDataAsJSON();
    generateTableFromJSON(formJsonData);
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const notes = document.getElementById('notes').value;

        let rowCount = table.rows.length;
        let newRow = table.insertRow(rowCount);

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);

        cell1.innerHTML = firstName;
        cell2.innerHTML = lastName;
        cell3.innerHTML = email;
        cell4.innerHTML = phone;
        cell5.innerHTML = notes;
    });

    // Example JSON data
    const jsonData = '[{"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "phone": "+123456789", "notes": "Sample note"}]';
    generateTableFromJSON(jsonData);
});

