


const wishlistBtns = document.querySelectorAll('.add-to-wishlist');

wishlistBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    const place = btn.dataset.place;
    try {
      const response = await fetch('../wishlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ place })
      });

      const result = (await response.text()).trim();

      if (result === 'success') {
        alert(`${place} added to wishlist!`);
      } else if (result === 'already_exists') {
        alert(`${place} is already in wishlist!`);
      } else {
        alert('Error: ' + result);
      }
    } catch (err) {
      alert('Something went wrong.');
      console.error(err);
    }
  });
});



// Delete Button
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!confirm("Are you sure you want to delete this wishlist item?")) return;

    // Get the place name from the <strong> text
    const wishlistName = btn.closest('.wishlist-card').querySelector('strong').textContent.trim();

    fetch('../wishlist.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'delete_wishlist_name=' + encodeURIComponent(wishlistName)
    })
    .then(res => res.text())
    .then(response => {
      if (response.trim() === 'deleted') {
        location.reload();
      } else {
        alert('Error deleting item: ' + response);
      }
    })
    .catch(err => {
      console.error('Fetch error:', err);
      alert('Something went wrong.');
    });
  });
});

//visit Button
document.querySelectorAll('.visit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const destinationText = btn.closest('.wishlist-card')
            .querySelector('p').textContent;
        const destination = destinationText.replace("Destination:", "").trim();
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(destination)}`;
    });
});
