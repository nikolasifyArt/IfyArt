# Manual Test Cases for Contact Form

## Form Validation Tests

1. **Empty Form Submission**
   - Action: Submit form without filling any fields
   - Expected: Form should not submit and highlight required fields
   - Status: [ ]

2. **Email Format Validation**
   - Action: Enter invalid email formats
   - Test cases:
     - [ ] test@
     - [ ] test.com
     - [ ] @test.com
   - Expected: Form should show email format error
   - Status: [ ]

3. **Phone Number Format**
   - Action: Enter invalid phone numbers
   - Test cases:
     - [ ] Letters: "abcdefghij"
     - [ ] Too short: "123"
     - [ ] Special characters: "123-@#$"
   - Expected: Form should show phone format error
   - Status: [ ]

## Form Submission Tests

4. **Successful Submission**
   - Action: Fill all fields correctly and submit
   - Test data:     ```
     First Name: John
     Last Name: Doe
     Email: john.doe@example.com
     Country Code: +1
     Phone: 1234567890
     Message: Test message     ```
   - Expected: 
     - [ ] Success message appears
     - [ ] Form clears
     - [ ] Email received at configured address
   - Status: [ ]

5. **Button State**
   - Action: Submit form
   - Expected:
     - [ ] Button shows loading state
     - [ ] Button is disabled during submission
     - [ ] Button returns to normal state after submission
   - Status: [ ]

## Error Handling Tests

6. **Network Error**
   - Action: Submit form while offline
   - Expected: Show appropriate error message
   - Status: [ ]

7. **Server Error**
   - Action: Trigger server error (e.g., invalid SMTP credentials)
   - Expected: Show appropriate error message
   - Status: [ ]

## Security Tests

8. **XSS Prevention**
   - Action: Submit form with script tags in message
   - Test data: `<script>alert('test')</script>`
   - Expected: Content should be properly escaped
   - Status: [ ]

9. **Bot Protection**
   - Action: Test bot check functionality
   - Expected: Bot check must be completed for submission
   - Status: [ ]

## Integration Tests

10. **Multiple Submissions**
    - Action: Submit form multiple times in succession
    - Expected: All submissions should be handled correctly
    - Status: [ ]

11. **Form Reset**
    - Action: Submit form successfully then try to submit again
    - Expected: Form should be clear and ready for new submission
    - Status: [ ]

## Notes:
- Run tests in multiple browsers (Chrome, Firefox, Safari)
- Test on both desktop and mobile devices
- Check email formatting in different email clients
