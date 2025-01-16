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
    movies.forEach((movie) => {
        const trendingMoviesSection = document.querySelector(".trending__movies");
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
        trendingMoviesSection.appendChild(movieContainer);
        movieContainer.append(movieImageContainer, movieTitle, movieDescription);  
        movieImageContainer.appendChild(moviePoster);

    });
}

async function getCategoriesPreview() {
    const { data } = await apiBaseURL("genre/movie/list");
    const categoriesData = data.genres;
    console.log(categories);
    categoriesData.forEach((category) => {
        const categoriesContainer = document.querySelector(".categories__categories-container");
        const categoryContainer = document.createElement("div");
        const categoryTitle = document.createElement("h3");
        const imageContainer = document.createElement("figure");
        const categoryImage = document.createElement("img");
        categoryContainer.classList.add("categories-container__category");
        categoryTitle.classList.add("categories-container__title");
        imageContainer.classList.add("categories-container__image-container");
        categoryTitle.textContent = category.name;
        categoryImage.src = "./../images/movie-icon.png";
        categoryImage.alt = category.name;
        categoriesContainer.appendChild(categoryContainer);
        categoryContainer.append(imageContainer, categoryTitle);
        imageContainer.appendChild(categoryImage);
    });
}

async function getUpcomingMoviesPreview() {
    const { data } = await apiBaseURL("movie/upcoming");
    const upcomingMovies = data.results;
    console.log(upcomingMovies);
    upcomingMovies.forEach((movie) => {
        const upcomingMoviesSection = document.querySelector(".upcoming__movies");
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
        upcomingMoviesSection.appendChild(movieContainer);
        movieContainer.append(movieImageContainer, movieTitle, movieDescription);  
        movieImageContainer.appendChild(moviePoster);
    });
}