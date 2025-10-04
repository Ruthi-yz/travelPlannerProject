<?php
session_start();  
if (!isset($_SESSION['user_id'])) {
   header("Location: ./login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Triplore - Dashboard</title>
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="./css/explore.css" />
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Roboto&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Metal+Mania&display=swap" rel="stylesheet">
</head>
<body>

    <nav>
        <h1 id="home-button">Triplore <h3 class="motto">Map it. Plan it. Live it</h3></h1>
        <div id="nav-buttons">
      
          <div id="guest-nav" style="display:none;">
          </div>
      
          <div id="user-nav" style="display:flex;">
            <button id="nav-home" class="nav-btn active"><a href="home.html">Home</a></button>
            <button id="nav-explore" class="nav-btn">Explore Destinations</button>
            <button id="nav-trips" class="nav-btn"><a href="trips.php">Trips</a></button>
            <button id="nav-dashboard" class="nav-btn"><a href="dashboard.php">Dashboard</a></button>
            <button id="nav-account" class="nav-btn"><a href="account.php">Account</a></button>
            <button id="logout-btn">Logout</button>
          </div>
      
        </div>
      </nav>
      
  <main>
  
  
    <div class="country-gallery">
      <h1 class="welcoming">POPULAR <span class="highlight">DESTINATION</span></h1>
     <!--  <h4 >Are you planing to Travel? Explore popular Destinations worth visiting </h4> -->
      <div class="gallery-scroll" id="explore-gallery" action="./wishlist.php"  method="POST">
        <div class="country-card">
          <img src="https://i.pinimg.com/1200x/d2/00/fe/d200fe3e34c6f1d84567f50ca0773e83.jpg" alt="Greece">
          <h3 class ="place">Greece</h3>
          <button class="add-to-wishlist" data-place="Greece">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/58/90/ca/5890ca1936eada1bf62aae087bcea67d.jpg" alt="New York">
          <h3 class ="place">New York</h3>
         <button class="add-to-wishlist" data-place="New York">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/67/6f/6a/676f6a242558b7c08f7d2a63fb951b2e.jpg" alt="Tokyo">
          <h3 class ="place">Tokyo</h3>
         <button class="add-to-wishlist" data-place="Tokyo">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/ab/22/76/ab22769a158a91c9c5e0b2032870df0e.jpg" alt="Italy">
          <h3 class ="place">Italy</h3>
         <button class="add-to-wishlist" data-place="Italy">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/1200x/b8/ea/76/b8ea76961221e4f369d4c52719ed3618.jpg" alt="Paris">
          <h3 class ="place">Paris</h3>
        <button class="add-to-wishlist" data-place="Paris">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/1200x/a7/8e/a1/a78ea10a681859657c4dd6cac89a2440.jpg" alt="Spain">
          <h3 class ="place">Spain</h3>
          <button class="add-to-wishlist" data-place="Spain">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/87/01/12/870112554ed554357b844f61493ce547.jpg" alt="Thailand">
          <h3 class ="place">Thailand</h3>
          <button class="add-to-wishlist" data-place="Thailand">">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/95/c4/3c/95c43c2f2363a1fdf951fbdc94d7025b.jpg" alt="Australia">
          <h3 class ="place">Sydney</h3>
          <button class="add-to-wishlist" data-place="Sydney">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/49/25/3b/49253b55e4dd554afdb90277890268e0.jpg" alt="Brazil">
          <h3 class ="place">Brazil</h3>
         <button class="add-to-wishlist" data-place="Brazil">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/fb/fa/e2/fbfae2c3c2e87975037ed94ce0e67a23.jpg" alt="Canada">
          <h3 class ="place">Canada</h3>
         <button class="add-to-wishlist" data-place="Canada">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/0c/63/37/0c6337d708b01b3ad065c668359c9291.jpg" alt="Egypt">
          <h3 class ="place">Egypt</h3>
         <button class="add-to-wishlist" data-place="Egypt">Add to Wishlist</button>
        </div>
        <div class="country-card" >
          <img src="https://i.pinimg.com/736x/46/7d/c0/467dc0d8f718d9b0e1c38ea2bb8d9967.jpg" alt="India">
          <h3 class ="place">India</h3>
          <button class="add-to-wishlist" data-place="India">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/1200x/21/2c/84/212c84127ed8f4f80af5673042f846c6.jpg" alt="Mexico">
          <h3 class ="place">Mexico</h3>
         <button class="add-to-wishlist" data-place="Mexico">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/c8/c5/12/c8c512c7e988b2e1d9a82bcee68e8d2f.jpg" alt="South Africa">
          <h3 class ="place">South Africa</h3>
        <button class="add-to-wishlist" data-place="South Africa">Add to Wishlist</button>
        </div>
        <div class="country-card">
          <img src="https://i.pinimg.com/736x/38/1e/71/381e714ee60f8c08d1a5b41d3a0b776f.jpg" alt="Switzerland">
          <h3 class ="place">Switzerland</h3>
          <button class="add-to-wishlist" data-place="Switzerland">Add to Wishlist</button>
        </div>
      </div>
    
    <!-- Standalone Other button -->
    <div style="text-align:center; margin-top:1.5rem;">
      <button id="other-btn" class="action-btn">Other</button>
    </div>
    
  </div>
</section>
 
</main>
  <script src="./js/wishlist.js"></script>
<script src="./js/explore.js"></script>
</body>
</html>