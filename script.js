// document.getElementById('searchBtn').addEventListener('click', function() {
//     const query = document.getElementById('searchInput').value;
//     const apiKey = 'dfd5bcb6'; // Replace with your actual API key
//     const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.Response === "True") {
//                 displayResults(data.Search);
//             } else {
//                 document.getElementById('results').innerHTML = '<p>No results found</p>';
//             }
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });

// function displayResults(movies) {
//     const resultsContainer = document.getElementById('results');
//     resultsContainer.innerHTML = ''; // Clear previous results
//     movies.forEach(movie => {
//         const movieElement = document.createElement('div');
//         movieElement.innerHTML = `
//             <h2>${movie.Title} (${movie.Year})</h2>
//             <img src="${movie.Poster}" alt="${movie.Title} poster">
//         `;
//         resultsContainer.appendChild(movieElement);
//     });
// }
document.getElementById('searchBtn').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    const apiKey = 'dfd5bcb6'; // Replace with your actual API key
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    document.getElementById('loading').style.display = 'block'; // Show loading state

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('loading').style.display = 'none'; // Hide loading state
            if (data.Response === "True") {
                displayResults(data.Search);
            } else {
                document.getElementById('results').innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none'; // Hide loading state
            document.getElementById('results').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
            console.error('Error fetching data:', error);
        });
});

function displayResults(movies) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <h2>${movie.Title} (${movie.Year})</h2>
            <img src="${movie.Poster}" alt="${movie.Title} poster">
            <p>Genre: ${movie.Genre || 'N/A'}</p>
            <p>${movie.Plot || 'No description available.'}</p>
        `;
        resultsContainer.appendChild(movieElement);
    });
}


