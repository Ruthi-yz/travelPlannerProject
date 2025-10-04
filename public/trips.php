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

// Handle Create Trip
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['trip_name'])){
    $tripName = $_POST['trip_name'];
    $destination = $_POST['trip-destination'];
    $startDate = $_POST['trip-start-date'];
    $endDate = $_POST['trip-end-date'];
    $notes = $_POST['trip-notes'];
try{
    $sql = "INSERT INTO trip (tripName, destination, startDate, endDate, notes, userId) 
            VALUES (:tripName,:destination, :startDate, :endDate, :notes, :userId)";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':tripName' => $tripName,
        ':destination' => $destination,
        ':startDate' => $startDate,
        ':endDate' => $endDate,
        ':notes' => $notes,
        ':userId' => $userId
    ]);
    header("Location: trips.php");
    exit;
  }catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
}

// Handle Delete Trip
if(isset($_POST['delete_trip_id'])){
    $tripId = $_POST['delete_trip_id'];
    $sql = "DELETE FROM trip WHERE tripId = :tripId AND userId = :userId";
    $stmt = $db->prepare($sql);
    $stmt->execute([':tripId' => $tripId, ':userId' => $userId]);
    echo "Trip deleted!";
    exit;
}

// Handle Edit Trip
if(isset($_POST['action']) && $_POST['action'] === 'edit'){
    $tripId = $_POST['tripId'];
    $tripName = $_POST['trip_name'];
    $destination = $_POST['destination'];
    $startDate = $_POST['start_date'];
    $endDate = $_POST['end_date'];
    $notes = $_POST['notes'];

    $sql = "UPDATE trip 
            SET tripName = :tripName, destination = :destination, startDate = :startDate, endDate = :endDate, notes = :notes
            WHERE tripId = :tripId AND userId = :userId";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':tripName' => $tripName,
        ':destination' => $destination,
        ':startDate' => $startDate,
        ':endDate' => $endDate,
        ':notes' => $notes,
        ':tripId' => $tripId,
        ':userId' => $userId
    ]);
    echo "Trip updated!";
    exit;
}

// Fetch Trips
$sql = "SELECT * FROM trip WHERE userId = :userId ORDER BY startDate DESC";
$stmt = $db->prepare($sql);
$stmt->execute([':userId' => $userId]);
$trips = $stmt->fetchAll(PDO::FETCH_ASSOC);

$tripsHtml = "";
if (count($trips) === 0) {
    $tripsHtml = "<div class='trip-card'>
        <h3>No trips planned yet</h3>
        <p>Start by creating your first trip!</p>
      </div>";
} else {
    foreach ($trips as $trip) {
        $tripsHtml .= "<div class='trip-card' data-trip-id='{$trip['tripId']}'>
            <h3>{$trip['tripName']}</h3>
            <p><strong>Destination:</strong> {$trip['destination']}</p>
            <p><strong>Dates:</strong> " . date('Y-m-d', strtotime($trip['startDate'])) . " - " . date('Y-m-d', strtotime($trip['endDate'])) . "</p>
            <p><strong>Notes:</strong> " . nl2br(htmlspecialchars($trip['notes'])) . "</p>
            <button class='action-btn visit-btn'>Visit</button>
            <button class='action-btn edit-btn'>Edit</button>
            <button class='action-btn todo-btn'>Add-todo-list</button>
            <button class='action-btn delete-btn'>Delete</button>
          </div>";
    }
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Triplore - My Trips</title>
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="./css/trips.css">
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Roboto&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Metal+Mania&display=swap" rel="stylesheet">
</head>
<body>
  <nav>
    <h1 id="home-button">Triplore <h3 class="motto">Map it. Plan it. Live it</h3></h1>
    <div id="nav-buttons">
      <div id="guest-nav" style="display:none;"></div>
      <div id="user-nav" style="display:flex;">
        <button id="nav-home" class="nav-btn"><a href="home.html">Home</a></button>
        <button id="nav-explore" class="nav-btn"><a href="explore.php">Explore Destinations</a></button>
        <button id="nav-trips" class="nav-btn active">Trips</button>
        <button id="nav-dashboard" class="nav-btn"><a href="dashboard.php">Dashboard</a></button>
        <button id="nav-account" class="nav-btn"><a href="account.php">Account</a></button>
        <button id="logout-btn">Logout</button>
      </div>
    </div>
  </nav>

  <main>
    <section id="trips-section" class="page-section active">
      <h1 class="welcoming">MY <span class="highlight">TRIPS</span></h1>
      
      <div class="trips-container">
        <button class="action-btn" id="create-trip-btn">+ Create New Trip</button>
        <button class="action-btn" id="view-wishlist-btn"><a href="wishlist.php">My Wishlist</a></button>
        <div id="trip-form" style="display: none; margin-top: 2rem;">
          <div class="account-card">
            <h3>Plan Your Trip</h3>
            <form id="new-trip-form" method="POST" action="">
              <input type="text" name="trip_name" id="trip-name" placeholder="Trip Name" required>
              <input type="text" name="trip-destination" id="trip-destination" placeholder="Destination" required>
              <input type="date" name="trip-start-date" id="trip-start-date" placeholder="start Date"required>
              <input type="date" name="trip-end-date" id="trip-end-date" placeholder="End Date" required>
              <textarea id="trip-notes" name = "trip-notes" placeholder="Notes (optional)"></textarea>
              <button type="submit" id ="action-btn"  class="action-btn">Save Trip</button>
            </form>
          </div>

        </div>

        <div id="trips-list" class="dashboard-cards" style="margin-top: 2rem;"> 
            <?php echo $tripsHtml; ?>
        </div>
   
   <div id="todoList-modal" class="modal hidden">
      <div class="modal-content">
        <h2 id="TodoList-Title">Things to Do</h2>
        <div id="TodoList-form"> 
          <!-- Trip details will be populated here -->
       </div>
        <div class="form-actions">
          <button type="button" class="action-btn" id="edit-trip-from-details">Edit Trip</button>
          <button type="button" class="action-btn cancel-btn" id="close-trip-details">Close</button>
        </div>
      </div>
    </div> 

    <!-- Edit Trip Modal -->
    <div id="edit-trip-modal" class="modal hidden">
      <div class="modal-content">
        <h2>Edit Trip</h2>
        <form id="edit-trip-form">
          <input type="hidden" id="edit-trip-id">
          <input type="text" id="edit-trip-name" placeholder="Trip Name" required>
          <input type="text" id="edit-trip-destination" placeholder="Destination" required>
          <input type="date" id="edit-trip-start-date" required>
          <input type="date" id="edit-trip-end-date" required>
          <textarea id="edit-trip-notes" placeholder="Notes (optional)"></textarea>
          <div class="form-actions">
            <button type="button" class="action-btn cancel-btn" id="cancel-edit-trip">Cancel</button>
            <button type="submit" class="action-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    

 </section>
 <script src="./js/wishlist.js"></script>
  <script src="./js/trips.js"></script>
</body>
</html>