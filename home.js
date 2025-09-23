document.addEventListener('DOMContentLoaded', () => {
  const authOverlay = document.getElementById('auth-overlay');
  const loginSection = document.getElementById('login-section');
  const signupSection = document.getElementById('signup-section');

  const guestNav = document.getElementById('guest-nav');
  const userNav = document.getElementById('user-nav');

  // Buttons to show login/signup modals
  const showLoginBtns = document.querySelectorAll('#show-login, #switch-to-login, #login-btn');
  const showSignupBtns = document.querySelectorAll('#show-signup, #switch-to-signup');

  // Logout button
  const logoutBtn = document.getElementById('logout-btn');

  function showLogin() {
    authOverlay.classList.remove('hidden');
    loginSection.classList.remove('hidden');
    signupSection.classList.add('hidden');
  }

  function showSignup() {
    authOverlay.classList.remove('hidden');
    signupSection.classList.remove('hidden');
    loginSection.classList.add('hidden');
  }

  function hideOverlay() {
    authOverlay.classList.add('hidden');
    loginSection.classList.add('hidden');
    signupSection.classList.add('hidden');
  }

  // Show login modal buttons
  showLoginBtns.forEach(btn => {
    btn?.addEventListener('click', e => {
      e.preventDefault();
      showLogin();
    });
  });

  // Show signup modal buttons
  showSignupBtns.forEach(btn => {
    btn?.addEventListener('click', e => {
      e.preventDefault();
      showSignup();
    });
  });

  // Close overlay if clicking outside modal content
  authOverlay.addEventListener('click', e => {
    if (e.target === authOverlay) hideOverlay();
  });

  // Login form submit
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value.trim();
    const password = e.target.querySelector('input[type="password"]').value.trim();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Welcome back, ${user.fullName || user.email}!`);
      hideOverlay();
      updateUIForLoggedInUser(user);
    } else {
      alert('Invalid email or password');
    }
  });

  // Signup form submit
  document.getElementById('signupForm').addEventListener('submit', e => {
    e.preventDefault();
    const fullName = e.target.querySelector('input[type="text"]').value.trim();
    const email = e.target.querySelector('input[type="email"]').value.trim();
    const password = e.target.querySelector('input[type="password"]').value.trim();

    if (!fullName || !email || !password) {
      alert('Please fill out all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      alert('Email already registered');
      return;
    }

    const newUser = { fullName, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    alert(`Welcome, ${fullName}!`);
    hideOverlay();
    updateUIForLoggedInUser(newUser);
  });

  // Logout button
  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    alert('Logged out');
    guestNav.style.display = 'flex';
    userNav.style.display = 'none';
    // Optional: refresh page or reset UI here
  });

  // Update UI for logged in user
  function updateUIForLoggedInUser(user) {
    guestNav.style.display = 'none';
    userNav.style.display = 'flex';

    const welcomeHeading = document.getElementById('welcome-heading');
    if (welcomeHeading) {
      welcomeHeading.innerHTML = `WELCOME BACK TO <span class="highlight">TripLore!</span><br>Ready for Your Next Adventure?`;
    }

    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userCreated = document.getElementById('user-created');

    if (userName) userName.textContent = user.fullName || 'N/A';
    if (userEmail) userEmail.textContent = user.email || 'N/A';
    if (userCreated) userCreated.textContent = new Date(user.createdAt).toLocaleDateString() || 'N/A';
  }

  // On page load, check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    updateUIForLoggedInUser(currentUser);
  }
});

