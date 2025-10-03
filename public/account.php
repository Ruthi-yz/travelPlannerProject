<?php 
session_start();

if (!isset($_SESSION['user_id'])) {
   header("Location: ./login.php");
    exit;
}

$firstName    = $_SESSION['firstName'] ?? '';
$lastName     = $_SESSION['lastName'] ?? '';
$email        = $_SESSION['email'] ?? '';
$member_since = $_SESSION['member_since'] ?? '';
$country = $_SESSION['country'] ?? '';

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Triplore - Account</title>
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="./css/account.css">
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Roboto&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Metal+Mania&display=swap" rel="stylesheet">
</head>
<body>
  <nav>
    <h1 id="home-button">Triplore <h3 class="motto">Map it. Plan it. Live it</h3></h1>
    <div id="nav-buttons">
      <div id="guest-nav" style="display:none;"></div>
      <div id="user-nav" style="display:flex;">
        <button id="nav-home" class="nav-btn"><a href="home.php">Home</a></button>
        <button id="nav-explore" class="nav-btn"><a href="explore.php">Explore Destinations</a></button>
        <button id="nav-trips" class="nav-btn"><a href="trips.php">Trips</a></button>
        <button id="nav-dashboard" class="nav-btn"><a href="dashboard.php">Dashboard</a></button>
        <button id="nav-account" class="nav-btn active">Account</button>
        <button id="logout-btn">Logout</button>
      </div>
    </div>
  </nav>

  <main>
    <section id="account-section" class="page-section active">
      <h1 class="welcoming">ACCOUNT <span class="highlight">SETTING</span></h1>
      <div class="account-container">
        <div class="account-card">
          <h3>Profile Information</h3>
          <div class="profile-info">
              <?php if (!empty($firstName)): ?>
              <p><strong>Name:</strong> <span id="user-name"> <?= htmlspecialchars($firstName) ?>  <?= htmlspecialchars($lastName) ?> </span></p>       
             <p><strong>Email:</strong> <span id="user-email"><?= htmlspecialchars($email) ?> </span></p>
             <p><strong>Country:</strong> <span id="country"><?= htmlspecialchars($country) ?> </span></p>
            <p><strong>Member Since:</strong> <span id="user-created"><?= htmlspecialchars($member_since) ?> </span></p>
            
               <?php endif; ?>   
          </div>
          <button class="action-btn" id="edit-profile-btn">Edit Profile</button>
        </div>
        <div class="account-card">
          <h3>Account Settings</h3>
          <button class="action-btn" id="change-password-btn">Change password</button>
          <button class="action-btn" id="privacy-settings-btn">Privacy Settings</button>
          <button class="action-btn delete-btn" id="delete-account-btn">Delete Account</button>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      <div id="edit-profile-modal" class="modal hidden">
        <div class="modal-content">
          <h2>Edit Profile</h2>
          <form id="edit-profile-form">
            <label for="edit-name">Full Name</label>
            <input type="text" id="edit-name" required>
            
            <label for="edit-email">Email</label>
            <input type="email" id="edit-email" required>
            
            <div class="form-actions">
              <button type="button" class="action-btn cancel-btn" id="cancel-edit">Cancel</button>
              <button type="submit" class="action-btn">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Change password Modal -->
      <div id="change-password-modal" class="modal hidden">
        <div class="modal-content">
          <h2>Change password</h2>
          <form id="change-password-form">
            <label for="current-password">Current password</label>
            <input type="password" id="current-password" required>
            
            <label for="new-password">New password</label>
            <input type="password" id="new-password" required>
            
            <label for="confirm-password">Confirm New password</label>
            <input type="password" id="confirm-password" required>
            
            <div class="form-actions">
              <button type="button" class="action-btn cancel-btn" id="cancel-password">Cancel</button>
              <button type="submit" class="action-btn">Update password</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>

  <script src="./js/account.js"></script>
</body>
</html>