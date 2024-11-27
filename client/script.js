const movieListElement = document.getElementById('movie-list');
const movieDetailsElement = document.getElementById('movie-details');
const movieTitleElement = document.getElementById('movie-title');
const moviePosterElement = document.getElementById('movie-poster');
const movieDescriptionElement = document.getElementById('movie-description');

async function fetchMovies() {
    const searchQuery = document.getElementById('search').value;
    const response = await fetch(`http://localhost:5000/api/movies?search=${searchQuery}`);
    const movies = await response.json();
    displayMovies(movies);
}

function displayMovies(movies) {
    movieListElement.innerHTML = ''; // Clear the list
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');                 //Commento di prova
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="Movie Poster" />
            <h3>${movie.title}</h3>
        `;
        movieCard.onclick = () => showMovieDetails(movie);
        movieListElement.appendChild(movieCard);
    });
}

function showMovieDetails(movie) {
    movieTitleElement.textContent = movie.title;
    moviePosterElement.src = movie.poster;
    movieDescriptionElement.textContent = movie.description;
    movieDetailsElement.style.display = 'block';
}

function closeDetails() {
    movieDetailsElement.style.display = 'none';
}

// Carica i film all'avvio
fetchMovies();
