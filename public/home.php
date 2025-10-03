<?php 
session_start();  

if (!isset($_SESSION['user_id'])) {
   header("Location: ./login.php");
   exit;
}
$firstName = $_SESSION['firstName'] ?? '';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <div class="container">
       <nav>
        <h1 id="home-button">Triplore <h3 class="motto">Map it. Plan it. Live it</h3></h1>
          <h5 class='session_owner'>Hello <?php echo htmlspecialchars($firstName); ?></h5>
          
          <div id="user-nav" style="display:flex;">
            <button id="nav-home" class="nav-btn active"><a href="home.php">Home</a></button>
            <button id="nav-explore" class="nav-btn"><a href="explore.php">Explore Destinations</a></button>
            <button id="nav-trips" class="nav-btn"><a href="trips.php">Trips</a></button>
            <button id="nav-dashboard" class="nav-btn"><a href="dashboard.php">Dashboard</a></button>
            <button id="nav-account" class="nav-btn"><a href="account.php">Account</a></button>
            <button id="logout-btn"><a href="logout.php">Logout</a></button>
          </div>
        
      </nav>
        <section id="home-section" class="page-section active">
           <h1 class="welcoming">WELCOME TO <span class="highlight">TRIPLORE</span></h1>
           <!-- <h1 class="welcoming" id="welcome-heading">WELCOME TO <span class="highlight">TripLore!</span></h1> -->
           <h2>Ready for Your Next Adventure?</h2>
       </section>
    </div>
    <script src="home.js"></script>
</body>
</html>
