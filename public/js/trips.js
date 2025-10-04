// Toggle Create Trip Form
const createTripBtn = document.getElementById('create-trip-btn');
const tripContainer = document.getElementsByClassName('trips-container');
// Create Trip toggle
if (createTripBtn) {
    createTripBtn.addEventListener('click', function() {
        const tripForm = document.getElementById('trip-form');
        if (tripForm) {
             tripForm.style.display = tripForm.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// View Wishlist modal


// Validate New Trip Form
const newTripForm = document.getElementById('new-trip-form');
if (newTripForm) {
    newTripForm.addEventListener("submit", function(e) {
        const startDate = new Date(document.getElementById('trip-start-date').value);
        const endDate   = new Date(document.getElementById('trip-end-date').value);

        if (endDate < startDate) {
            e.preventDefault();
            alert("End date must be after start date");
        }
    });
}

// Visit Button
document.querySelectorAll('.visit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const destinationText = btn.closest('.trip-card')
            .querySelector('p').textContent;
        const destination = destinationText.replace("Destination:", "").trim();
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(destination)}`;
    });
});

// Delete Button
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!confirm("Are you sure you want to delete this trip?")) return;

        const tripId = btn.closest('.trip-card').dataset.tripId;

        fetch('trips.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'delete_trip_id=' + encodeURIComponent(tripId)
        })
        .then(res => res.text())
        .then(() => location.reload());
    });
});

// Edit Button
document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tripCard = btn.closest('.trip-card');
        tripCard.style.display ='absolute';
        const tripId = tripCard.dataset.tripId;
        console.log(tripId);
      
        const tripForm = document.getElementById('edit-trip-modal');
        tripForm.classList.remove('hidden');

        const editForm = document.getElementById('edit-trip-form');
        editForm.querySelector('#edit-trip-id').value = tripId;

        const ps = tripCard.querySelectorAll('p');
        const destination = ps[0].textContent.replace("Destination:", "").trim();
        const dates = ps[1].textContent.replace("Dates:", "").trim().split(' - ');
        const notes = ps[2].textContent.replace("Notes:", "").trim();

        editForm.querySelector('#edit-trip-name').value = tripCard.querySelector('h3').textContent;
        editForm.querySelector('#edit-trip-destination').value = destination;
        editForm.querySelector('#edit-trip-start-date').value = dates[0];
        editForm.querySelector('#edit-trip-end-date').value = dates[1];
        editForm.querySelector('#edit-trip-notes').value = notes;
    });
});

const cancelEditBtn = document.getElementById('cancel-edit-trip');
if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
        document.getElementById('edit-trip-modal').classList.add('hidden');
    });
}

const editTripForm = document.getElementById('edit-trip-form');
if (editTripForm) {
    editTripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;

        const data = new URLSearchParams();
        data.append('action', 'edit');
        data.append('tripId', form.querySelector('#edit-trip-id').value);
        data.append('trip_name', form.querySelector('#edit-trip-name').value);
        data.append('destination', form.querySelector('#edit-trip-destination').value);
        data.append('start_date', form.querySelector('#edit-trip-start-date').value);
        data.append('end_date', form.querySelector('#edit-trip-end-date').value);
        data.append('notes', form.querySelector('#edit-trip-notes').value);

        fetch('trips.php', {
            method: 'POST',
            body: data
        })
        .then(res => res.text())
        .then(() => location.reload());
    });
}



document.querySelectorAll('.todo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tripForm = document.getElementById('TodoList-form');
        if (tripForm) {
             tripForm.style.display = tripForm.style.display === 'none' ? 'block' : 'none';
        }
    });
});
