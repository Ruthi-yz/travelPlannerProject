document.addEventListener('DOMContentLoaded', function () {
    // === DOM REFERENCES ===
    const homeSection = document.getElementById('home-section');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const galleryScroll = document.querySelector('.gallery-scroll');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
  
    // === Load NAV Partial ===
    fetch('nav.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('nav-placeholder').innerHTML = html;
        setupNavListeners();
        checkAuthState();
      });
  
    // === Gallery Scroll Buttons ===
    if (leftBtn && rightBtn && galleryScroll) {
      leftBtn.addEventListener('click', () => {
        galleryScroll.scrollBy({ left: -300, behavior: 'smooth' });
      });
  
      rightBtn.addEventListener('click', () => {
        galleryScroll.scrollBy({ left: 300, behavior: 'smooth' });
      });
  
      galleryScroll.addEventListener('scroll', () => {
        leftBtn.style.visibility = galleryScroll.scrollLeft > 0 ? 'visible' : 'hidden';
        rightBtn.style.visibility = galleryScroll.scrollLeft < (galleryScroll.scrollWidth - galleryScroll.clientWidth) ? 'visible' : 'hidden';
      });
    }
  
    // === Setup Nav Button Event Listeners ===
    function setupNavListeners() {
      const showLoginBtn = document.getElementById('show-login');
      const showSignupBtn = document.getElementById('show-signup');
      const switchToSignup = document.getElementById('switch-to-signup');
      const switchToLogin = document.getElementById('switch-to-login');
      const homeButton = document.getElementById('home-button');
      const logoutBtn = document.getElementById('logout-btn');
  
      showLoginBtn?.addEventListener('click', () => {
        loginSection.classList.remove('hidden');
        signupSection.classList.add('hidden');
        homeSection.classList.add('blur');
      });
  
      showSignupBtn?.addEventListener('click', () => {
        signupSection.classList.remove('hidden');
        loginSection.classList.add('hidden');
        homeSection.classList.add('blur');
      });
  
      switchToSignup?.addEventListener('click', () => {
        loginSection.classList.add('hidden');
        signupSection.classList.remove('hidden');
      });
  
      switchToLogin?.addEventListener('click', () => {
        signupSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
      });
  
      homeButton?.addEventListener('click', () => {
        homeSection.classList.remove('blur');
        loginSection.classList.add('hidden');
        signupSection.classList.add('hidden');
      });
  
      document.querySelectorAll('.back-to-home').forEach(btn => {
        btn.addEventListener('click', () => {
          homeSection.classList.remove('blur');
          loginSection.classList.add('hidden');
          signupSection.classList.add('hidden');
        });
      });
  
      [loginSection, signupSection].forEach(modal => {
        modal?.addEventListener('click', e => {
          if (e.target === modal) {
            modal.classList.add('hidden');
            homeSection.classList.remove('blur');
          }
        });
      });
  
      logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        location.reload(); // Refresh to reset UI
      });
    }
  
    // === Form Submissions ===
    document.getElementById('loginForm')?.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const password = this.querySelector('input[type="password"]').value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Login successful! Welcome back, ${user.fullName}`);
        loginSection.classList.add('hidden');
        homeSection.classList.remove('blur');
        updateUIForLoggedInUser(user);
      } else {
        alert('Invalid credentials');
      }
    });
  
    document.getElementById('signupForm')?.addEventListener('submit', function (e) {
      e.preventDefault();
      const fullName = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const password = this.querySelector('input[type="password"]').value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
  
      if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return;
      }
  
      const newUser = {
        fullName,
        email,
        password,
        createdAt: new Date().toISOString()
      };
  
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
  
      alert(`Account created successfully! Welcome, ${fullName}`);
      signupSection.classList.add('hidden');
      homeSection.classList.remove('blur');
      updateUIForLoggedInUser(newUser);
    });
  
    // === Update UI for Logged In User ===
    function updateUIForLoggedInUser(user) {
      const guestNav = document.getElementById('guest-nav');
      const userNav = document.getElementById('user-nav');
  
      if (guestNav) guestNav.style.display = 'none';
      if (userNav) userNav.style.display = 'flex';
  
      const welcomeHeading = document.getElementById('welcome-heading');
      if (welcomeHeading) {
        welcomeHeading.innerHTML = `WELCOME BACK TO <span class="highlight">TripLore!</span><br>Ready for Your Next Adventure?`;
      }
  
      const userName = document.getElementById('user-name');
      if (userName) userName.textContent = user.fullName;
  
      const userEmail = document.getElementById('user-email');
      if (userEmail) userEmail.textContent = user.email;
  
      const userCreated = document.getElementById('user-created');
      if (userCreated) {
        const date = new Date(user.createdAt);
        userCreated.textContent = date.toLocaleDateString();
      }
    }
  
    // === On Page Load, Check Session ===
    function checkAuthState() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        updateUIForLoggedInUser(currentUser);
      } else {
        const welcomeHeading = document.getElementById('welcome-heading');
        if (welcomeHeading) {
          welcomeHeading.innerHTML = `WELCOME TO <span class="highlight">TripLore!</span><br>Ready for Your Next Adventure?`;
        }
      }
    }
  });
  