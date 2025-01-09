// Get item ID from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');

const itemInfo = document.querySelector('#item-info');

// Fetch item details from the backend
fetch(`http://localhost:3000/items/${itemId}`)
    .then(response => response.json())
    .then(item => {
        const itemDetails = `
            <div class="item-card">
                <img src="https://via.placeholder.com/150" alt="Item Image">
                <h3>${item.title}</h3>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Price:</strong> $${item.price}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <button onclick="window.history.back()">Go Back</button>
            </div>
        `;
        itemInfo.innerHTML = itemDetails;
    })
    .catch(error => {
        itemInfo.innerHTML = `<p>Error loading item details. Please try again later.</p>`;
        console.error('Error fetching item details:', error);
    });
