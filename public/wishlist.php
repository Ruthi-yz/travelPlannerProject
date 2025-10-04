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

// Fetch wishlist

$sql = "SELECT * FROM wishlist WHERE userId = :userId ORDER BY id DESC"; 
$stmt = $db->prepare($sql); 
$stmt->execute([':userId' => $userId]); 
$wishlists = $stmt->fetchAll(PDO::FETCH_ASSOC); 
$wishlists = $wishlists ? $wishlists : [];


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['place'])) {
    $place = trim($_POST['place']);
    
    try {
        $checkSql = "SELECT * FROM wishlist WHERE placeName = :placeName AND userId = :userId";
        $checkStmt = $db->prepare($checkSql);
        $checkStmt->execute([
            ':placeName' => $place,
            ':userId' => $userId
        ]);
        
        if ($checkStmt->rowCount() > 0) {
            echo "already_exists";
        } else {
            $sql = "INSERT INTO wishlist (placeName, userId) VALUES (:placeName, :userId)";
            $stmt = $db->prepare($sql);
            $stmt->execute([
                ':placeName' => $place,
                ':userId' => $userId
            ]);
            echo "success";
        }
    } catch (PDOException $e) {
        echo "already_exists" ;
    }
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_wishlist_name'])) {
    $placeName = $_POST['delete_wishlist_name'];
    
    try {
        $sql = "DELETE FROM wishlist WHERE placeName = :placeName AND userId = :userId";
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':placeName' => $placeName,
            ':userId' => $userId
        ]);
        echo "deleted";
    } catch (PDOException $e) {
        echo "error";
    }
    exit;
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/wishlist.css">
   <link rel="stylesheet" href="./css/trips.css">
</head>
<body>
  <nav>
    <h1 id="home-button">Triplore <h3 class="motto">Map it. Plan it. Live it</h3></h1>
    <div id="nav-buttons">
      <div id="guest-nav" style="display:none;"></div>
      <div id="user-nav" style="display:flex;">
        <button id="nav-home" class="nav-btn"><a href="home.html">Home</a></button>
        <button id="nav-explore" class="nav-btn"><a href="explore.php">Explore Destinations</a></button>
        <button id="nav-trips" class="nav-btn active"><a href="trips.php">Trips</a></button>
        <button id="nav-dashboard" class="nav-btn"><a href="dashboard.php">Dashboard</a></button>
        <button id="nav-account" class="nav-btn"><a href="account.php">Account</a></button>
        <button id="logout-btn">Logout</button>
      </div>
    </div>
  </nav>

 <section id="trips-section" class="page-section active">
    
    <div class="trips-container">
       
    </div>
    <div id="wishlist-modal" class="dashboard-cards modal-content" style="margin-top: 2rem;">
      <h2>My Wishlist</h2>
        <?php if (count($wishlists) > 0): ?>
          <?php foreach ($wishlists as $wishlist): ?>
            <div class="wishlist-card" wishlist-id="<?= htmlspecialchars($wishlist['id']) ?>">
              <p><strong><?= htmlspecialchars($wishlist['placeName']) ?></strong></p>
              <button class="action-btn visit-btn">Visit</button>
              <button class="action-btn delete-btn">Delete</button>
          </div>
          <?php endforeach; ?>
        <?php else: ?>
          <p>No Wishlist Added Yet</p>
        <?php endif; ?>

      <button class="action-btn" style="margin-left : 1rem"><a href="explore.php">Add Wishlist</a></button>
      <button class="action-btn"><a href="trips.php">Back</a></button>
</div>
</section>
<script src="./js/wishlist.js"></script>
</body>
</html>

