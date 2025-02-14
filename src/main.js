const apiBaseURL = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
    },
})

//Helpers
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry.target);
        if(entry.isIntersecting) {
            const url = entry.target.getAttribute("data-img");
            entry.target.setAttribute("src", url);    
        }
    });
})

function createMoviesForHome(movies, container, lazyLoading = false) {
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
        moviePoster.setAttribute(
            lazyLoading ? "data-img" : "src", 
            `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        // moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        moviePoster.alt = movie.title;
        moviePoster.addEventListener("error", () => {
            moviePoster.src = "./../images/error-image.jpg";
            movieContainer.classList.add("image-error");
        });
        movieTitle.textContent = movie.title;
        container.appendChild(movieContainer);
        movieContainer.append(moviePosterContainer, movieTitle);
        moviePosterContainer.appendChild(moviePoster);

        movieContainer.addEventListener("click", () => {
            if (!movieContainer.classList.contains("image-error")) {
                location.hash = `#movie=${movie.id}`;
            }        
        });

        if(lazyLoading) {
            lazyLoader.observe(moviePoster);
        }
    });
}

function createMoviesForPages(
    movies,
    container,
    { 
        lazyLoading = false,
        clean = true 
    } = {},
) {

    if(clean) {
        container.innerHTML = "";
    }

    movies.forEach((movie) => {
        const movieContainer = document.createElement("div");
        const moviePosterContainer = document.createElement("figure");
        const moviePoster = document.createElement("img");
        const movieTitle = document.createElement("h3");
        movieContainer.classList.add("movie-container");
        moviePosterContainer.classList.add("poster-container");
        moviePoster.classList.add("movie-image");
        movieTitle.classList.add("movies-info");
        moviePoster.setAttribute(
            lazyLoading ? "data-img" : "src", 
            `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        // moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        moviePoster.alt = movie.title;
        moviePoster.addEventListener("error", () => {
            moviePoster.src = "./../images/error-image.jpg";
            movieContainer.classList.add("image-error");
        });
        movieTitle.textContent = movie.title;
        container.appendChild(movieContainer);
        movieContainer.append(moviePosterContainer, movieTitle);
        moviePosterContainer.appendChild(moviePoster);
        
        movieContainer.addEventListener("click", () => {
            if (!movieContainer.classList.contains("image-error")) {
                location.hash = `#movie=${movie.id}`;
            }        
        });

        if(lazyLoading) {
            lazyLoader.observe(moviePoster);
        }
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
        categoryTitle.addEventListener("click", () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        categoryImage.src = "./../images/movie-icon.png";
        categoryImage.alt = category.name;
        container.appendChild(categoryContainer);
        categoryContainer.append(imageContainer, categoryTitle);
        imageContainer.appendChild(categoryImage);
    });
}

function showSkeletonLoaders(container) {
    container.innerHTML = `
        <div class="movie-container-skeleton">
            <div class="movie-container-skeleton--loading"></div>
            <div class="movie-container-skeleton--loading"></div>
            <div class="movie-container-skeleton--loading"></div>
        </div>
    `;
}

function showSkeletonLoadersForPages(container) {
    container.innerHTML = `
        <div class="pages-skeleton--loading"></div>
        <div class="pages-skeleton--loading"></div>
        <div class="pages-skeleton--loading"></div>
        <div class="pages-skeleton--loading"></div>
        `;
}

function hideSkeletonLoaders(container) {
    container.innerHTML = "";
}
//API calls

async function getTrendingMoviesPreview() {
    showSkeletonLoaders(trendingMovies);
    const { data } = await apiBaseURL("trending/movie/day");
    const movies = data.results;
    console.log(movies);
    hideSkeletonLoaders(trendingMovies);
    createMoviesForHome(movies, trendingMovies, true);
}

async function getCategoriesPreview() {
    const { data } = await apiBaseURL("genre/movie/list");
    const categoriesData = data.genres;
    console.log(categoriesData);
    createCategories(categoriesData, categoriesContainer);
}

async function getUpcomingMoviesPreview() {
    showSkeletonLoaders(upcomingMovies);
    const { data } = await apiBaseURL("movie/upcoming");
    const upcomingMoviesData = data.results;
    console.log(upcomingMoviesData);
    hideSkeletonLoaders(upcomingMovies);   
    createMoviesForHome(upcomingMoviesData, upcomingMovies, true);
}

async function getMoviesByCategory(id) {
    // moviesContainer.innerHTML = "";
    showSkeletonLoadersForPages(moviesContainer);
    const { data } = await apiBaseURL("discover/movie", {
        params: {
            with_genres: id,
        }
    });
    // hideSkeletonLoaders(moviesContainer);
    const categoryData = data.results;
    console.log(categoryData);
    createMoviesForPages(categoryData, moviesContainer, { lazyLoading: true });
}

async function getMoviesBySearch(query) {
    // moviesContainer.innerHTML = "";
    showSkeletonLoadersForPages(moviesContainer);
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
        hideSkeletonLoaders(moviesContainer);
        createMoviesForPages(searchData, moviesContainer, { lazyLoading: true });
    }
}

async function getTrendingMovies() {
    // moviesContainer.innerHTML = "";
    const { data } = await apiBaseURL("trending/movie/day");
    const movies = data.results;
    console.log(movies);
    if(movies.length === 0) {
        moviesContainer.textContent = `I'm sorry, no movies found`;
    } else {
        createMoviesForPages(movies, moviesContainer, { lazyLoading: true });
    }

    // const buttonLoadMore = document.createElement("button");
    // buttonLoadMore.textContent = "Load more";
    // buttonLoadMore.classList.add("load-more-button");
    // moviesContainer.appendChild(buttonLoadMore);
    // buttonLoadMore.addEventListener("click", getPaginatedTrendingMovies);
}

window.addEventListener("scroll", getPaginatedTrendingMovies);

async function getPaginatedTrendingMovies() {
    const { 
        scrollTop,
        scrollHeight,
        clientHeight 
    } = document.documentElement;

    const scrollReachedBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if(scrollReachedBottom) {
        page++;
        const { data } = await apiBaseURL("trending/movie/day", {
            params: {
                page,
            }
        });
        const movies = data.results;
        console.log(movies);
        createMoviesForPages(movies, moviesContainer, { lazyLoading: true, clean: false });
    }
    
    // const previousButton = document.querySelector(".load-more-button");
    // previousButton.remove();

    // const buttonLoadMore = document.createElement("button");
    // buttonLoadMore.textContent = "Load more";
    // buttonLoadMore.classList.add("load-more-button");
    // moviesContainer.appendChild(buttonLoadMore);
    // buttonLoadMore.addEventListener("click", getPaginatedTrendingMovies);
}

async function getMovieById(movieId) {
    const { data } = await apiBaseURL(`movie/${movieId}`);
    const movies = data;
    console.log(movies);

    movieDetailsPoster.src = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
    movieDetailsPoster.alt = movies.title;
    movieDetailsTitle.textContent = movies.title;
    movieDetailsDescription.textContent = movies.overview;
    movieDetailsReleaseDate.textContent = `Release date: ${movies.release_date}`;
    movieDetailsGenres.textContent = `Genres: ${movies.genres.map((genre) => genre.name).join(", ")}`;
    movieDetailsRating.textContent = `Rating: ${movies.vote_average.toFixed(1)} ⭐`;
    movieDetailsRuntime.textContent = `Runtime: ${movies.runtime} minutes`;

    getRelatedMoviesPreview(movieId);
}

async function getRelatedMoviesPreview (id) {
    // movieDetailsRelatedMoviesContainer.innerHTML = "";
    showSkeletonLoadersForPages(movieDetailsRelatedMoviesContainer);
    const { data } = await apiBaseURL(`movie/${id}/similar`);
    const relatedMovies = data.results;
    console.log(relatedMovies);
    hideSkeletonLoaders(movieDetailsRelatedMoviesContainer);
    createMoviesForPages(relatedMovies, movieDetailsRelatedMoviesContainer, { lazyLoading: true });
}