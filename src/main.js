const apiBaseURL = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
    },
})

//Helpers
function createMoviesForHome(movies, container) {
    container.innerHTML = "";
    movies.forEach((movie) => {
        const movieContainer = document.createElement("div");
        const moviePosterContainer = document.createElement("figure");
        const moviePoster = document.createElement("img");
        const movieTitle = document.createElement("h3");
        movieContainer.classList.add("movie-container");
        moviePosterContainer.classList.add("container__poster");
        moviePoster.classList.add("movie-image");
        movieTitle.classList.add("movies-info");
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        moviePoster.alt = movie.title;
        movieTitle.textContent = movie.title;
        container.appendChild(movieContainer);
        movieContainer.append(moviePosterContainer, movieTitle);
        moviePosterContainer.appendChild(moviePoster);

        movieContainer.addEventListener("click", () => {
            location.hash = `#movie=${movie.id}`;
        });
    });
}

function createMoviesForPages(movies, container) {
    //No me funciona el container.innerHTML = "";, porque me esta pasando el mismo problema de antes, que se borra todo el contenido de la pagina
    // container.innerHTML = "";

    movies.forEach((movie) => {
        const movieContainer = document.createElement("div");
        const moviePosterContainer = document.createElement("figure");
        const moviePoster = document.createElement("img");
        const movieTitle = document.createElement("h3");
        movieContainer.classList.add("movie-container");
        moviePosterContainer.classList.add("poster-container");
        moviePoster.classList.add("movie-image");
        movieTitle.classList.add("movies-info");
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        moviePoster.alt = movie.title;
        movieTitle.textContent = movie.title;
        container.appendChild(movieContainer);
        movieContainer.append(moviePosterContainer, movieTitle);
        moviePosterContainer.appendChild(moviePoster);
        
        movieContainer.addEventListener("click", () => {
            location.hash = `#movie=${movie.id}`;
        });
    });
}

function createCategories(categories, container) {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
        const categoryContainer = document.createElement("div");
        const categoryTitle = document.createElement("h3");
        const imageContainer = document.createElement("figure");
        const categoryImage = document.createElement("img");
        categoryContainer.classList.add("categories-container__category");
        categoryTitle.classList.add("categories-container__title");
        imageContainer.classList.add("categories-container__image-container");
        categoryTitle.textContent = category.name;
        categoryTitle.id = category.id;
        categoryImage.src = "./../images/movie-icon.png";
        categoryImage.alt = category.name;
        container.appendChild(categoryContainer);
        categoryContainer.append(imageContainer, categoryTitle);
        imageContainer.appendChild(categoryImage);
    });
}
//API calls

async function getTrendingMoviesPreview() {
    const { data } = await apiBaseURL("trending/movie/day");
    const movies = data.results;
    console.log(movies);
    createMoviesForHome(movies, trendingMovies);
}

async function getCategoriesPreview() {
    const { data } = await apiBaseURL("genre/movie/list");
    const categoriesData = data.genres;
    console.log(categoriesData);
    createCategories(categoriesData, categoriesContainer);
}

async function getUpcomingMoviesPreview() {
    const { data } = await apiBaseURL("movie/upcoming");
    const upcomingMoviesData = data.results;
    console.log(upcomingMoviesData);
    createMoviesForHome(upcomingMoviesData, upcomingMovies);
}

async function getMoviesByCategory(id) {
    moviesContainer.innerHTML = "";
    const { data } = await apiBaseURL("discover/movie", {
        params: {
            with_genres: id,
        }
    });
    const categoryData = data.results;
    console.log(categoryData);
    createMoviesForPages(categoryData, moviesContainer);
}

async function getMoviesBySearch(query) {
    moviesContainer.innerHTML = "";
    const { data } = await apiBaseURL("search/movie", {
        params: {
            query,
        }
    });
    const searchData = data.results;
    console.log(searchData);
    if(searchData.length === 0) {
        moviesContainer.textContent = `I'm sorry, no movies were found`;
    } else {
        createMoviesForPages(searchData, moviesContainer);
    }
}

async function getTrendingMovies() {
    moviesContainer.innerHTML = "";
    const { data } = await apiBaseURL("trending/movie/day");
    const movies = data.results;
    console.log(movies);
    if(movies.length === 0) {
        moviesContainer.textContent = `I'm sorry, no movies found`;
    } else {
        createMoviesForPages(movies, moviesContainer);
    }
}

async function getMovieById(movieId) {
    const { data } = await apiBaseURL(`movie/${movieId}`);
    const movies = data;
    console.log(movies);

    movieDetailsPoster.src = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
    movieDetailsTitle.textContent = movies.title;
    movieDetailsDescription.textContent = movies.overview;
    movieDetailsReleaseDate.textContent = `Release date: ${movies.release_date}`;
    movieDetailsGenres.textContent = `Genres: ${movies.genres.map((genre) => genre.name).join(", ")}`;
    movieDetailsRating.textContent = `Rating: ${movies.vote_average.toFixed(1)} ⭐`;
    movieDetailsRuntime.textContent = `Runtime: ${movies.runtime} minutes`;
}