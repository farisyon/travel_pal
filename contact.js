// Get the form element
const form = document.querySelector('#contact-form');

// Get the form fields
const nameField = form.querySelector('#name');
const emailField = form.querySelector('#email');
const messageField = form.querySelector('#message');

// Get the form submit button
const submitButton = form.querySelector('input[type="submit"]');

// Add event listener for form submission
form.addEventListener('submit', (e) => {
  // Prevent the form from submitting
  e.preventDefault();

  // Validate the form fields
  if (nameField.value.trim() === '') {
    alert('Please enter your name');
    nameField.focus();
    return false;
  }

  if (emailField.value.trim() === '') {
    alert('Please enter your email');
    emailField.focus();
    return false;
  }

  if (!isValidEmail(emailField.value)) {
    alert('Please enter a valid email address');
    emailField.focus();
    return false;
  }

  if (messageField.value.trim() === '') {
    alert('Please enter your message');
    messageField.focus();
    return false;
  }

  // Submit the form
  form.submit();
});

// Helper function to check if email address is valid
function isValidEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}
