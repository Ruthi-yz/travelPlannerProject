
document.getElementById('signupForm').addEventListener('submit', function(e) {
  const email= document.querySelector('input[name="email"]').value;
  if(!email.includes('@')||!email.includes('.')){
    e.preventDefault();
    alert("Please enter a valid email address.");
    return;
  }
  const password = document.querySelector('input[name="password"]').value;
  if (password.length < 4) {
    e.preventDefault();
    alert("password must be at least 6 characters long.");
    return;
  }
  const confirmpassword = document.querySelector('input[name="confirmpassword"]').value;
  if (password !== confirmpassword) {
    e.preventDefault();
    alert("passwords do not match.");
    return;
  }
  const terms = document.querySelector('input[name="terms"]');
  if (!terms.checked) {
    e.preventDefault();
    alert("You must agree to the terms and conditions!");
  }
});

