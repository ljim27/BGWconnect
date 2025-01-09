const itemList = document.querySelector('.item-list');

fetch('http://localhost:3000/items') // Backend API endpoint
    .then(response => response.json())
    .then(data => {
        itemList.innerHTML = ''; // Clear placeholder content
        data.forEach(item => {
            const itemCard = `
                <div class="item-card">
                    <img src="assets/${item.image || 'default-image.jpg'}" alt="Item Image">
                    <h3>${item.title}</h3>
                    <p>$${item.price}</p>
                    <p>Location: ${item.location}</p>
                    <button onclick="window.location.href='item-details.html?id=${item.id}'">View Details</button>
                </div>
            `;
            itemList.innerHTML += itemCard; // Append each item card
        });
    })
    .catch(error => console.error('Error fetching items:', error));
