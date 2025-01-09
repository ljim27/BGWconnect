// Fetch Items and Display on Page
const itemList = document.querySelector('.item-list');

fetch('http://localhost:3000/items') // Backend API endpoint
    .then(response => response.json())
    .then(data => {
        itemList.innerHTML = ''; // Clear placeholder content
        data.forEach(item => {
            const itemCard = `
                <div class="item-card">
                    <img src="https://via.placeholder.com/150" alt="Item Image">
                    <h3>${item.title}</h3>
                    <p>$${item.price}</p>
                    <p>Location: ${item.location}</p>
                    <button>View Details</button>
                </div>
            `;
            itemList.innerHTML += itemCard; // Append each item card
        });
    })
    .catch(error => console.error('Error fetching items:', error));

// Fetch Community Posts and Display in the Community Board Section
const postList = document.querySelector('.posts');

fetch('http://localhost:3000/community-board') // Replace with actual endpoint
    .then(response => response.json())
    .then(data => {
        postList.innerHTML = ''; // Clear placeholder content
        data.forEach(post => {
            const postCard = `
                <div class="post-card">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <small>Posted by User ${post.user_id}</small>
                </div>
            `;
            postList.innerHTML += postCard; // Append each post card
        });
    })
    .catch(error => console.error('Error fetching posts:', error));
