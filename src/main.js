const apiBaseURL = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
    },
})

async function getTrendingMoviesPreview() {
    const { data } = await apiBaseURL("trending/movie/day");
    const movies = data.results;
    console.log(movies);
    trendingMovies.innerHTML = "";
    movies.forEach((movie) => {
        const movieContainer = document.createElement("div");
        const movieImageContainer = document.createElement("figure");
        const moviePoster = document.createElement("img");
        const movieTitle = document.createElement("h3");
        const movieDescription = document.createElement("p");
        movieContainer.classList.add("movies__movie-container");
        movieImageContainer.classList.add("container__poster");
        moviePoster.classList.add("poster__image");
        moviePoster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        moviePoster.alt = movie.title;
        movieTitle.classList.add("movies__info");
        movieTitle.textContent = movie.title;
        movieDescription.classList.add("movies__info");
        // movieDescription.textContent = movie.overview;
        trendingMovies.appendChild(movieContainer);
        movieContainer.append(movieImageContainer, movieTitle, movieDescription);  
        movieImageContainer.appendChild(moviePoster);

    });
}

async function getCategoriesPreview() {
    const { data } = await apiBaseURL("genre/movie/list");
    const categoriesData = data.genres;
    console.log(categoriesData);
    categoriesContainer.innerHTML = "";
    categoriesData.forEach((category) => {
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
        categoriesContainer.appendChild(categoryContainer);
        categoryContainer.append(imageContainer, categoryTitle);
        imageContainer.appendChild(categoryImage);
    });
}

async function getMoviesByCategory(id) {
    try {
        specificCategoryContainer.innerHTML = "";
        const { data } = await apiBaseURL("discover/movie", {
            params: {
                with_genres: id,
            }
        });
        const categoryData = data.results;
        console.log(categoryData);
        categoryData.forEach((movie) => {
            const movieContainer = document.createElement("div");
            const moviePoster = document.createElement("img");
            movieContainer.classList.add("specific-movie-container");
            moviePoster.classList.add("movie__image");
            moviePoster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            moviePoster.alt = movie.title;
            specificCategoryContainer.appendChild(movieContainer);
            movieContainer.append(moviePoster);  
        });
    } catch (error) {
        console.log(error);
    }
}

async function getUpcomingMoviesPreview() {
    const { data } = await apiBaseURL("movie/upcoming");
    const upcomingMoviesData = data.results;
    console.log(upcomingMoviesData);
    upcomingMovies.innerHTML = "";
    upcomingMoviesData.forEach((movie) => {
        const movieContainer = document.createElement("div");
        const movieImageContainer = document.createElement("figure");
        const moviePoster = document.createElement("img");
        const movieTitle = document.createElement("h3");
        const movieDescription = document.createElement("p");
        movieContainer.classList.add("movies__movie-container");
        movieImageContainer.classList.add("container__poster");
        moviePoster.classList.add("poster__image");
        moviePoster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        moviePoster.alt = movie.title;
        movieTitle.classList.add("movies__info");
        movieTitle.textContent = movie.title;
        movieDescription.classList.add("movies__info");
        // movieDescription.textContent = movie.overview;
        upcomingMovies.appendChild(movieContainer);
        movieContainer.append(movieImageContainer, movieTitle, movieDescription);  
        movieImageContainer.appendChild(moviePoster);
    });
}