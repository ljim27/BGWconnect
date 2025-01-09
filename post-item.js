const form = document.getElementById('post-item-form');
const messageDiv = document.getElementById('message');
const imagePreview = document.getElementById('image-preview');

// Image preview on file input change
document.getElementById('item-image').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;  // Preview the selected image
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather form data
    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value,
        location: document.getElementById('location').value,
    };

    // Send POST request to the backend
    fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                messageDiv.innerHTML = '<p>Item posted successfully!</p>';
                form.reset();
            } else {
                messageDiv.innerHTML = '<p>Error posting item. Please try again.</p>';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            messageDiv.innerHTML = '<p>Error posting item. Please try again.</p>';
        });
});
