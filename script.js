document.getElementById('searchBtn').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    const apiKey = 'dfd5bcb6'; 
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayResults(data.Search);
            } else {
                document.getElementById('results').innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayResults(movies) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <h2>${movie.Title} (${movie.Year})</h2>
            <img src="${movie.Poster}" alt="${movie.Title} poster">
        `;
        resultsContainer.appendChild(movieElement);
    });
}
