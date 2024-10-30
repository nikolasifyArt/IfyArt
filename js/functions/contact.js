// Function to handle form submission
async function handleFormSubmission() {
    // Get form data
    const formData = {
        firstName: document.getElementById('first_name').value,
        lastName: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        countryCode: document.getElementById('country_code').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('comment').value
    };

    try {
        // Send the data to your backend endpoint
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Email sent successfully!');
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send email. Please try again.');
    }
}