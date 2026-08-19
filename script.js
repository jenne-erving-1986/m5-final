
document.getElementById('searchBtn').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    const apiKey = 'dfd5bcb6'; // Replace with your actual API key
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

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

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const resultsDiv = document.getElementById('results');

// Sample data for demonstration
// let movies = [
//     { title: "Inception", year: 2010 },
//     { title: "The Matrix", year: 1999 },
//     { title: "Interstellar", year: 2014 },
//     { title: "The Godfather", year: 1972 },
//     { title: "Parasite", year: 2019 }
// ];

searchBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;
    
    let filteredResults = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) || filterValue === 'all'
    );

    if (filterValue === 'newest') {
        filteredResults.sort((a, b) => b.year - a.year);
    } else if (filterValue === 'oldest') {
        filteredResults.sort((a, b) => a.year - b.year);
    } else if (filterValue === 'alphabetical') {
        filteredResults.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filterValue === 'reverseAlphabetical') {
        filteredResults.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayResults(filteredResults);
});

function displayResults(movies) {
    resultsDiv.innerHTML = ''; // Clear previous results
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.textContent = `${movie.title} (${movie.year})`;
        resultsDiv.appendChild(movieDiv);
    });
}



