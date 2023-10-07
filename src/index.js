// write your code here
document.addEventListener('DOMContentLoaded', () => {
    // Function to display ramen details
    function displayRamenDetails(ramen) {
      const ramenDetail = document.getElementById('ramen-detail');
      ramenDetail.innerHTML = `
        <img src="${ramen.image}" alt="${ramen.name}">
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
        <h3>Rating:</h3>
        <p><span id='rating-display'>${ramen.rating}</span> / 10</p>
        <h3>Comment:</h3>
        <p id='comment-display'>${ramen.comment}</p>
      `;
    }
  
    // Function to fetch and display all ramen images
    function displayAllRamenImages() {
      fetch('http://localhost:4000/ramens')
        .then(response => response.json())
        .then(ramens => {
          const ramenMenu = document.getElementById('ramen-menu');
          ramens.forEach(ramen => {
            const img = document.createElement('img');
            img.src = ramen.image;
            img.addEventListener('click', () => displayRamenDetails(ramen));
            ramenMenu.appendChild(img);
          });
        });
    }
  
    // Event listener for the new ramen form
    const newRamenForm = document.getElementById('new-ramen');
    newRamenForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(newRamenForm);
      const newRamenData = Object.fromEntries(formData.entries());
  
      fetch('http://localhost:4000/ramens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRamenData),
      })
        .then(response => response.json())
        .then(newRamen => {
          const img = document.createElement('img');
          img.src = newRamen.image;
          img.addEventListener('click', () => displayRamenDetails(newRamen));
          document.getElementById('ramen-menu').appendChild(img);
        });
      newRamenForm.reset();
    });
  
    // Initial display of all ramen images
    displayAllRamenImages();
  });
  
