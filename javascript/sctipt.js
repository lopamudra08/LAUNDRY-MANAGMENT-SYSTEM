function validateForm() {
  var fullName = document.getElementById("full_name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("username").value;
  var phone = document.getElementById("phone").value;


  // Validate full name
  if (fullName === "") {
    document.getElementById("full_name_error").innerText =
      "Please enter your name";
    return false;
  } else {
    document.getElementById("full_name_error").innerText = "";
  }

  // Validate email
  if (email === "") {
    document.getElementById("email_error").innerText =
      "Please enter your email";
    return false;
  } else {
    document.getElementById("email_error").innerText = "";
  }

  // Validate password
  if (password === "") {
    document.getElementById("password_error").innerText =
      "Please enter a password";
    return false;
  } else {
    document.getElementById("password_error").innerText = "";
  }

  // Validate username
  if (username === "") {
    document.getElementById("username_error").innerText =
      "Please enter a username";
    return false;
  } else {
    document.getElementById("username_error").innerText = "";
  }

  // Validate phone
  if (phone === "") {
    document.getElementById("phone_error").innerText =
      "Please enter your phone number";
    return false;
  } else if (!/^[\d\s()+-]+$/.test(phone)) {
    document.getElementById("phone_error").innerText =
      "Please enter a valid phone number";
    return false;
  } else {
    document.getElementById("phone_error").innerText = "";
  }

  if (fullName !== '' && email !== '' && password !== '' && username !== '' && phone !== '') {
    // Form is valid, show success message
    var successMessage = document.createElement('p');
    successMessage.textContent = 'Registration successful!';
    successMessage.style.color = 'red';
    document.body.appendChild(successMessage);
    return false;
  }

  return true; // Form is valid, allow submission
}
