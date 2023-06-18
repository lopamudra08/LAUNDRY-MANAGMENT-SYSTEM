function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email === "" || password === "") {
      window.alert("Please fill in all fields");
      return false;
    }

    // Email validation regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      alert("Please enter a valid email address");
      return false;
    }

    // Additional validation logic can be added here

    return true;
  }

