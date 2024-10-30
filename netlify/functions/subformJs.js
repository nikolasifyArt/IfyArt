const { sendContactEmail } = require('../../js/emailform');

exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const formData = JSON.parse(event.body);
        
        // Send email using the imported function
        const result = await sendContactEmail(formData);
        
        if (result.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ 
                    success: true, 
                    message: 'Email sent successfully',
                    messageId: result.messageId 
                })
            };
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                success: false, 
                error: error.message 
            })
        };
    }
};

//export json data to be used in the form 
export const formFields = [
    {
        FirstName: 'name',
        label: 'Name',
        type: 'text',
        required: true,
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
    },
    {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
    },
];
