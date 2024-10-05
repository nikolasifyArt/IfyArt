// JavaScript to handle session storage
document.addEventListener("DOMContentLoaded", function () {
  if (!sessionStorage.getItem("mobileButtonShown")) {
    const mobileButton = document.querySelector(".mobile-button");
    if (window.innerWidth <= 768) {
      mobileButton.style.display = "block";
      sessionStorage.setItem("mobileButtonShown", "true");
    }
  }

  // Handle form submission
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const comments = document.getElementById("comment").value;

    // Simple validation
    if (!firstName || !lastName || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    // Display form values (for demonstration purposes)
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Comments:", comments);

    // Example form submission logic using fetch
    fetch("https://example.com/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        comments: comments,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the form. Please try again.");
      });

    // Clear the form
    form.reset();
  });
});
