document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === currentUser?.email);
    
    // Initialize user trips data if not exists
    if (user && !user.trips) {
      user.trips = [];
      localStorage.setItem('users', JSON.stringify(users));
    }
  
    // Show/hide trip form
    document.getElementById('create-trip-btn')?.addEventListener('click', function() {
      const tripForm = document.getElementById('trip-form');
      tripForm.style.display = tripForm.style.display === 'none' ? 'block' : 'none';
    });
  
    // Handle new trip form submission
    document.getElementById('new-trip-form')?.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const tripName = document.getElementById('trip-name').value;
      const tripDestination = document.getElementById('trip-destination').value;
      const tripStartDate = document.getElementById('trip-start-date').value;
      const tripEndDate = document.getElementById('trip-end-date').value;
      const tripNotes = document.getElementById('trip-notes').value;
  
      const newTrip = {
        id: Date.now().toString(),
        name: tripName,
        destination: tripDestination,
        startDate: tripStartDate,
        endDate: tripEndDate,
        notes: tripNotes,
        createdAt: new Date().toISOString(),
        destinations: []
      };
  
      user.trips.unshift(newTrip);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(user));
  
      // Reset form and hide it
      this.reset();
      document.getElementById('trip-form').style.display = 'none';
      
      // Update trips list
      renderTrips();
    });
  
    // Render trips list
    function renderTrips() {
      const tripsList = document.getElementById('trips-list');
      if (!tripsList) return;
  
      if (user?.trips?.length > 0) {
        tripsList.innerHTML = user.trips.map(trip => `
          <div class="trip-card">
            <h3>${trip.name}</h3>
            <p><strong>Destination:</strong> ${trip.destination}</p>
            <p><strong>Dates:</strong> ${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}</p>
            ${trip.notes ? `<p><strong>Notes:</strong> ${trip.notes}</p>` : ''}
            <button class="action-btn" onclick="viewTripDetails('${trip.id}')">View Details</button>
            <button class="action-btn" onclick="editTrip('${trip.id}')">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteTrip('${trip.id}')">Delete</button>
          </div>
        `).join('');
      } else {
        tripsList.innerHTML = `
          <div class="trip-card">
            <h3>No trips planned yet</h3>
            <p>Start by creating your first trip!</p>
          </div>
        `;
      }
    }
  
    // Initial render
    renderTrips();
  
    // Logout functionality
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'home.html';
    });
  });
  
  // These would be defined in a shared utilities file in a real app
  function viewTripDetails(tripId) {
    // In a real app, this would navigate to a trip details page
    alert(`Viewing trip ${tripId}`);
  }
  
  function editTrip(tripId) {
    // In a real app, this would show an edit form
    alert(`Editing trip ${tripId}`);
  }
  
  function deleteTrip(tripId) {
    if (confirm('Are you sure you want to delete this trip?')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === currentUser?.email);
      
      if (user) {
        user.trips = user.trips.filter(trip => trip.id !== tripId);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.reload();
      }
    }
  }