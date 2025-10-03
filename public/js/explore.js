// Add to Trip button click
const addToTripButtons = document.querySelectorAll('.add-to-trip');
addToTripButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.textContent = "Added";  
        btn.disabled = true;         
    });
});
document.querySelectorAll('.add-to-trip').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.country-card');
        const place = card.querySelector('.place').innerText;
        
        console.log("Adding place:", place);
        
        fetch("trips.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `place=${encodeURIComponent(place)}`
        })
        .then(response => response.text())
        .then(data => {
            console.log("Raw server response:", data);
            
            // Trim and check response
            const response = data.trim();
            
            if (response === "success") {
                alert(`✓ ${place} added to your wishlist!`);
                loadWishlist();
            } else {
                if (response.includes("success")) {
                    alert(`✓ ${place} added to your wishlist!`);
                addToTripButtons.textContent = "Added";
                btn.disabled = true;
                    loadWishlist();
                } else {
                    console.error("Unexpected response:", response);
                    alert("Unexpected error occurred.");
                }
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Network error occurred. Please check your connection.");
        });
    });
});
// On page load, check wishlist
fetch("trips.php?action=fetch_wishlist")
    .then(res => res.json())
    .then(data => {
        if (data.wishlist && Array.isArray(data.wishlist)) {
            const savedPlaces = data.wishlist.map(p => p.toLowerCase()); // normalize

            document.querySelectorAll('.add-to-trip').forEach(btn => {
                const card = btn.closest('.country-card');
                const place = card.querySelector('.place').innerText.toLowerCase();

                if (savedPlaces.includes(place)) {
                    btn.textContent = "Added";
                    btn.disabled = true;
                }
            });
        }
    })
    .catch(err => console.error("Wishlist fetch error:", err));


// Load wishlist items
function loadWishlist() {
    fetch("trips.php?action=fetch_wishlist")
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        console.log("Wishlist data received:", data);
        
        // Check if data is an array
        if (Array.isArray(data)) {
            const wishlistContainer = document.getElementById("wishlistItems");
            if (wishlistContainer) {
                wishlistContainer.innerHTML = "";
                if (data.length === 0) {
                    wishlistContainer.innerHTML = "<p>No items in your wishlist yet.</p>";
                    return;
                }
                data.forEach(item => {
                    const div = document.createElement("div");
                    div.className = "wishlist-item";
                    div.textContent = item.placeName;
                    wishlistContainer.appendChild(div);
                });
            }
        } else {
            console.error("Expected array but got:", data);
        }
    })
    .catch(err => {
        console.error("Wishlist load error:", err);
    });
}

// Initial load
loadWishlist();

