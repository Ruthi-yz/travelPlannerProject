document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === currentUser?.email);
    
    // Initialize user trips if not exists
    if (user && !user.trips) {
        user.trips = [];
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Add click event to all "Add to Trip" buttons
    document.querySelectorAll('.add-to-trip').forEach(button => {
        button.addEventListener('click', function() {
            const countryCard = this.closest('.country-card');
            const countryName = countryCard.querySelector('h3').textContent;
            const countryImage = countryCard.querySelector('img').src;
            
            const destination = {
                name: countryName,
                image: countryImage,
                addedAt: new Date().toISOString()
            };
            
            addDestinationToTrip(destination, this);
        });
    });

    // Other button functionality
    document.getElementById('other-btn')?.addEventListener('click', function() {
        const searchDiv = document.getElementById('other-search');
        searchDiv.style.display = searchDiv.style.display === 'none' ? 'block' : 'none';
        
        // Focus on input when shown
        if (searchDiv.style.display === 'block') {
            document.getElementById('country-search-input').focus();
        }
    });

    // Add country functionality (formerly search)
    document.getElementById('add-country-btn')?.addEventListener('click', function() {
        const searchInput = document.getElementById('country-search-input').value.trim();
        if (searchInput) {
            const destination = {
                name: searchInput,
                image: 'https://i.pinimg.com/736x/87/01/12/870112554ed554357b844f61493ce547.jpg', // Default image
                addedAt: new Date().toISOString(),
                isCustom: true
            };
            
            addDestinationToTrip(destination, this);
            document.getElementById('country-search-input').value = ''; // Clear input
            document.getElementById('other-search').style.display = 'none'; // Hide search
        } else {
            alert('Please enter a country name!');
        }
    });

    // Enter key support for add
    document.getElementById('country-search-input')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('add-country-btn').click();
        }
    });

    // Add destination to trip automatically
    function addDestinationToTrip(destination, buttonElement = null) {
        if (!user || !user.trips) {
            alert('Please create a trip first! Redirecting to trips page...');
            window.location.href = 'trips.html';
            return;
        }

        // Find the most recent trip or create a default one if no trips exist
        let targetTrip = user.trips[user.trips.length - 1]; // Get the last trip

        // If no trips exist, create a default one
        if (!targetTrip) {
            targetTrip = {
                id: Date.now().toString(),
                name: 'My First Trip',
                destination: destination.name,
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days later
                notes: 'Automatically created trip',
                createdAt: new Date().toISOString(),
                destinations: []
            };
            user.trips.push(targetTrip);
        }

        // Initialize destinations array if not exists
        if (!targetTrip.destinations) {
            targetTrip.destinations = [];
        }

        // Check if destination already exists in this trip
        const existingDestination = targetTrip.destinations.find(d => 
            d.name.toLowerCase() === destination.name.toLowerCase()
        );

        if (!existingDestination) {
            targetTrip.destinations.push(destination);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Show success message with trip name
            alert(`"${destination.name}" has been added to your trip "${targetTrip.name}"!`);
            
            // Visual feedback for the button that was clicked
            if (buttonElement) {
                const originalText = buttonElement.textContent;
                const originalBackground = buttonElement.style.background;
                
                buttonElement.textContent = '✓ Added!';
                buttonElement.style.background = '#4CAF50';
                buttonElement.style.color = 'white';
                
                setTimeout(() => {
                    buttonElement.textContent = originalText;
                    buttonElement.style.background = originalBackground;
                    buttonElement.style.color = '';
                }, 2000);
            }
            
        } else {
            alert(`"${destination.name}" is already in your trip "${targetTrip.name}"!`);
        }
    }

    // Logout functionality
    document.getElementById('logout-btn')?.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'home.html';
    });
});