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
  
    // Update dashboard stats
    function updateDashboardStats() {
      const tripsCount = user?.trips?.length || 0;
      const destinationsCount = user?.trips?.reduce((acc, trip) => acc + (trip.destinations?.length || 0), 0) || 0;
      const daysCount = user?.trips?.reduce((acc, trip) => {
        if (trip.startDate && trip.endDate) {
          const start = new Date(trip.startDate);
          const end = new Date(trip.endDate);
          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return acc + diffDays;
        }
        return acc;
      }, 0) || 0;
  
      document.getElementById('trips-count').textContent = tripsCount;
      document.getElementById('destinations-count').textContent = destinationsCount;
      document.getElementById('days-count').textContent = daysCount;
  
      // Update upcoming trips
      const upcomingTrips = document.getElementById('upcoming-trips');
      if (tripsCount > 0) {
        const nextTrip = user.trips[0]; // Simple example - would normally sort by date
        upcomingTrips.innerHTML = `
          <p><strong>${nextTrip.name}</strong></p>
          <p>${nextTrip.destination}</p>
          <p>${new Date(nextTrip.startDate).toLocaleDateString()} - ${new Date(nextTrip.endDate).toLocaleDateString()}</p>
        `;
      } else {
        upcomingTrips.innerHTML = '<p>No upcoming trips</p>';
      }
  
      // Update recent activity
      const activityList = document.getElementById('activity-list');
      if (tripsCount > 0) {
        activityList.innerHTML = user.trips.slice(0, 3).map(trip => 
          `<p>Added trip to ${trip.destination} on ${new Date(trip.createdAt || new Date()).toLocaleDateString()}</p>`
        ).join('');
      } else {
        activityList.innerHTML = '<p>No recent activity yet</p>';
      }
    }
  
    updateDashboardStats();
  
    // Logout functionality
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'home.html';
    });
  });