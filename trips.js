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
        <div class="trip-card" data-trip-id="${trip.id}">
          <h3>${trip.name}</h3>
          <p><strong>Destination:</strong> ${trip.destination}</p>
          <p><strong>Dates:</strong> ${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}</p>
          <p><strong>Duration:</strong> ${calculateTripDuration(trip.startDate, trip.endDate)} days</p>
          <p><strong>Destinations:</strong> ${trip.destinations?.length || 0} locations</p>
          ${trip.notes ? `<p><strong>Notes:</strong> ${trip.notes}</p>` : ''}
          <div class="trip-actions">
            <button class="action-btn" onclick="viewTripDetails('${trip.id}')">View Details</button>
            <button class="action-btn" onclick="editTrip('${trip.id}')">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteTrip('${trip.id}')">Delete</button>
          </div>
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

  // Calculate trip duration in days
  function calculateTripDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
  }

  // View Trip Details
  window.viewTripDetails = function(tripId) {
    const trip = user.trips.find(t => t.id === tripId);
    if (!trip) return;

    const modal = document.getElementById('trip-details-modal');
    const title = document.getElementById('trip-details-title');
    const content = document.getElementById('trip-details-content');

    title.textContent = trip.name;
    
    content.innerHTML = `
      <div class="trip-details">
        <p><strong>Destination:</strong> ${trip.destination}</p>
        <p><strong>Start Date:</strong> ${new Date(trip.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> ${new Date(trip.endDate).toLocaleDateString()}</p>
        <p><strong>Duration:</strong> ${calculateTripDuration(trip.startDate, trip.endDate)} days</p>
        <p><strong>Created:</strong> ${new Date(trip.createdAt).toLocaleDateString()}</p>
        ${trip.notes ? `<p><strong>Notes:</strong> ${trip.notes}</p>` : ''}
        
        <div class="destinations-section">
          <h3>Destinations (${trip.destinations?.length || 0})</h3>
          ${trip.destinations?.length > 0 ? 
            trip.destinations.map(dest => `
              <div class="destination-item">
                <p><strong>${dest.name}</strong> - Added: ${new Date(dest.addedAt).toLocaleDateString()}</p>
              </div>
            `).join('') : 
            '<p>No destinations added yet.</p>'
          }
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  };

  // Edit Trip
  window.editTrip = function(tripId) {
    const trip = user.trips.find(t => t.id === tripId);
    if (!trip) return;

    const modal = document.getElementById('edit-trip-modal');
    const form = document.getElementById('edit-trip-form');

    // Populate form with current trip data
    document.getElementById('edit-trip-id').value = trip.id;
    document.getElementById('edit-trip-name').value = trip.name;
    document.getElementById('edit-trip-destination').value = trip.destination;
    document.getElementById('edit-trip-start-date').value = trip.startDate;
    document.getElementById('edit-trip-end-date').value = trip.endDate;
    document.getElementById('edit-trip-notes').value = trip.notes || '';

    modal.classList.remove('hidden');
  };

  // Handle edit trip form submission
  document.getElementById('edit-trip-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tripId = document.getElementById('edit-trip-id').value;
    const tripName = document.getElementById('edit-trip-name').value;
    const tripDestination = document.getElementById('edit-trip-destination').value;
    const tripStartDate = document.getElementById('edit-trip-start-date').value;
    const tripEndDate = document.getElementById('edit-trip-end-date').value;
    const tripNotes = document.getElementById('edit-trip-notes').value;

    const tripIndex = user.trips.findIndex(t => t.id === tripId);
    if (tripIndex !== -1) {
      user.trips[tripIndex] = {
        ...user.trips[tripIndex],
        name: tripName,
        destination: tripDestination,
        startDate: tripStartDate,
        endDate: tripEndDate,
        notes: tripNotes
      };

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Close modal and refresh trips list
      document.getElementById('edit-trip-modal').classList.add('hidden');
      renderTrips();
      alert('Trip updated successfully!');
    }
  });

  // Modal event listeners
  document.getElementById('close-trip-details')?.addEventListener('click', function() {
    document.getElementById('trip-details-modal').classList.add('hidden');
  });

  document.getElementById('edit-trip-from-details')?.addEventListener('click', function() {
    const tripId = document.getElementById('trip-details-title').textContent;
    const trip = user.trips.find(t => t.name === tripId);
    if (trip) {
      document.getElementById('trip-details-modal').classList.add('hidden');
      editTrip(trip.id);
    }
  });

  document.getElementById('cancel-edit-trip')?.addEventListener('click', function() {
    document.getElementById('edit-trip-modal').classList.add('hidden');
  });

  // Close modals when clicking outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // Initial render
  renderTrips();

  // Logout functionality
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'home.html';
  });
});

// Delete Trip function
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