<?php
session_start(); 
include '../src/database.php'; 

if (!isset($_SESSION['user_id'])) {
    header("Location: ./login.php");
    exit;
}

$database = new Database();
$db = $database->connect();
$userId = $_SESSION['user_id'];

// Trips count
$stmt = $db->prepare("SELECT COUNT(*) AS tripCount FROM trip WHERE userId = :userId");
$stmt->execute([':userId' => $userId]);
$tripCount = $stmt->fetch(PDO::FETCH_ASSOC)['tripCount'];

// Destinations saved
$stmt = $db->prepare("SELECT COUNT(*) AS destinationCount FROM wishlist WHERE userId = :userId");
$stmt->execute([':userId' => $userId]);
$destinationCount = $stmt->fetch(PDO::FETCH_ASSOC)['destinationCount'];

// Trips list
$stmt = $db->prepare("SELECT * FROM trip WHERE userId = :userId ORDER BY startDate ASC");
$stmt->execute([':userId' => $userId]);
$trips = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Triplore - Dashboard</title>
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="./css/dashboard.css" />
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
        <button id="nav-dashboard" class="nav-btn active">Dashboard</button>
        <button id="nav-account" class="nav-btn"><a href="account.php">Account</a></button>
        <button id="logout-btn">Logout</button>
      </div>
    </div>
  </nav>

  <main>
    <section id="dashboard-section" class="page-section active">
      <h1 class="welcoming">TRAVEL <span class="highlight">DASHBOARD</span></h1>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <p class="stat-number" id="trips-count"><?= $tripCount ?></p>
          <p>Trips Planned</p>
        </div>
        <div class="stat-card">
          <p class="stat-number" id="destinations-count"><?= $destinationCount ?></p>
          <p>Destinations Saved</p>
        </div>
        <div class="stat-card">
          <p class="stat-number" id="days-count">0</p>
          <p>Days Traveling</p>
        </div>
      </div>

      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div id="activity-list">
          <?php if (count($trips) > 0): ?>
            <?php foreach (array_slice($trips, 0, 3) as $trip): ?>
              <p>Added trip to <?= htmlspecialchars($trip['destination']) ?> on <?= date('d/m/Y', strtotime($trip['startDate'])) ?></p>
            <?php endforeach; ?>
          <?php else: ?>
            <p>No recent activity yet</p>
          <?php endif; ?>
        </div>
      </div>

      <div class="dashboard-cards">
        <div class="dashboard-card">
          <h3>Quick Actions</h3>
          <button class="action-btn" onclick="location.href='explore.html'">Explore Destinations</button>
          <button class="action-btn" onclick="location.href='trips.php'">Plan New Trip</button>
          <button class="action-btn" onclick="location.href='account.html'">Update Profile</button>
        </div>
        <div class="dashboard-card">
          <h3>Upcoming Trips</h3>
          <div id="upcoming-trips">
            <?php if (count($trips) > 0): 
              $nextTrip = $trips[0]; ?>
              <p><strong><?= htmlspecialchars($nextTrip['tripName']) ?></strong></p>
              <p><?= htmlspecialchars($nextTrip['destination']) ?></p>
              <p><?= date('d/m/Y', strtotime($nextTrip['startDate'])) ?> - <?= date('d/m/Y', strtotime($nextTrip['endDate'])) ?></p>
            <?php else: ?>
              <p>No upcoming trips</p>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </section>
  </main>

</body>
</html>
