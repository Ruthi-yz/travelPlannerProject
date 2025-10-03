document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === currentUser?.email);
  
    // Update account info
    function updateAccountInfo() {
      if (user) {
        document.getElementById('user-name').textContent = user.fullName || 'Not set';
        document.getElementById('user-email').textContent = user.email || 'Not set';
        document.getElementById('user-created').textContent = 
          user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available';
        document.getElementById('user-trips').textContent = user.trips?.length || 0;
      }
    }
  
    // Initialize modals
    const editProfileModal = document.getElementById('edit-profile-modal');
    const changePasswordModal = document.getElementById('change-password-modal');
  
    // Edit Profile
    document.getElementById('edit-profile-btn').addEventListener('click', function() {
      document.getElementById('edit-name').value = user.fullName || '';
      document.getElementById('edit-email').value = user.email || '';
      editProfileModal.classList.remove('hidden');
    });
  
    document.getElementById('cancel-edit').addEventListener('click', function() {
      editProfileModal.classList.add('hidden');
    });
  
    document.getElementById('edit-profile-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const newName = document.getElementById('edit-name').value;
      const newEmail = document.getElementById('edit-email').value;
  
      // Update user data
      user.fullName = newName;
      user.email = newEmail;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(user));
  
      // Update UI and close modal
      updateAccountInfo();
      editProfileModal.classList.add('hidden');
      alert('Profile updated successfully!');
    });
  
    // Change Password
    document.getElementById('change-password-btn').addEventListener('click', function() {
      changePasswordModal.classList.remove('hidden');
    });
  
    document.getElementById('cancel-password').addEventListener('click', function() {
      changePasswordModal.classList.add('hidden');
    });
  
    document.getElementById('change-password-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
  
      if (currentPassword !== user.password) {
        alert('Current password is incorrect');
        return;
      }
  
      if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
      }
  
      // Update password
      user.password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(user));
  
      // Clear form and close modal
      this.reset();
      changePasswordModal.classList.add('hidden');
      alert('Password changed successfully!');
    });
  
    // Delete Account
    document.getElementById('delete-account-btn').addEventListener('click', function() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        // Remove user from users array
        const updatedUsers = users.filter(u => u.email !== user.email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.removeItem('currentUser');
        alert('Account deleted successfully');
        window.location.href = 'home.html';
      }
    });
  
    // Logout
    document.getElementById('logout-btn').addEventListener('click', function() {
      localStorage.removeItem('currentUser');
      window.location.href = 'home.html';
    });
  
    // Initialize account info
    updateAccountInfo();
  });