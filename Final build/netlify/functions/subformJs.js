export async function handler(event, context) {
    const data = JSON.parse(event.body);

    // Process the data (e.g., store in MySQL database)
    console.log(data);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submitted successfully' }),
    };
}