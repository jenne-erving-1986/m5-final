
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
                results = data.Search;
                displayResults(results);
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



let results = []
document.getElementById('filterSelect').addEventListener('change', function() {
    const selectedOption = this.value;
    sortResults(selectedOption);
});

function sortResults(option) {
    let sortedResults;
    
    if (option === 'all') {
        sortedResults = results;
    } else if (option === 'a-z') {
        // Assuming results is your array of movie objects
        sortedResults = results.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (option === 'z-a') {
        sortedResults = results.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (option === 'newest') {
        sortedResults = results.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (option === 'oldest') {
        sortedResults = results.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }
    displayResults(sortedResults); // Call your existing function to display the results
}



