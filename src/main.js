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
        const likeButton = document.createElement("button");
        likeButton.classList.add("like-button");
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
        movieContainer.append(likeButton, moviePosterContainer, movieTitle);
        moviePosterContainer.appendChild(moviePoster);

        moviePoster.addEventListener("click", () => {
            if (!movieContainer.classList.contains("image-error")) {
                location.hash = `#movie=${movie.id}`;
            }        
        });

        likeButton.addEventListener("click", () => {
            console.log("LIKE");
            likeButton.classList.toggle("like-button--liked");
            //AQUI SE GUARDA EN LOCAL STORAGE
        })

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
        const likeButton = document.createElement("button");
        likeButton.classList.add("like-button");
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
        movieContainer.append(likeButton, moviePosterContainer, movieTitle);
        moviePosterContainer.appendChild(moviePoster);
        
        moviePoster.addEventListener("click", () => {
            if (!movieContainer.classList.contains("image-error")) {
                location.hash = `#movie=${movie.id}`;
            }        
        });

        likeButton.addEventListener("click", () => {
            console.log("LIKE");
            likeButton.classList.toggle("like-button--liked");
            //AQUI SE GUARDA EN LOCAL STORAGE
        })

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
    const categoryData = data.results;
    maxPage = data.total_pages;
    console.log(categoryData);
    console.log(maxPage);
    createMoviesForPages(categoryData, moviesContainer, { lazyLoading: true });
}

function getPaginatedMoviesByCategory(id) {
    return async function () {
        const { 
            scrollTop,
            scrollHeight,
            clientHeight 
        } = document.documentElement;
    
        const pageIsNotMax = page < maxPage;
        const scrollReachedBottom = scrollTop + clientHeight >= scrollHeight - 50;
    
        if(scrollReachedBottom && pageIsNotMax) {
            page++;
            const { data } = await apiBaseURL("discover/movie", {
                params: {
                    with_genres: id,
                    page,
                }
            });
            const categoryData = data.results;
            console.log(categoryData);
            createMoviesForPages(categoryData, moviesContainer, { lazyLoading: true, clean: false });
        }
    }
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
    maxPage = data.total_pages;
    console.log(searchData);
    console.log(maxPage);
    if(searchData.length === 0) {
        moviesContainer.textContent = `I'm sorry, no movies were found`;
    } else {
        hideSkeletonLoaders(moviesContainer);
        createMoviesForPages(searchData, moviesContainer, { lazyLoading: true });
    }
}

function getPaginatedMoviesBySearch(query) {
    return async function () {
        const { 
            scrollTop,
            scrollHeight,
            clientHeight 
        } = document.documentElement;
    
        const pageIsNotMax = page < maxPage;
        const scrollReachedBottom = scrollTop + clientHeight >= scrollHeight - 50;
    
        if(scrollReachedBottom && pageIsNotMax) {
            page++;
            const { data } = await apiBaseURL("search/movie", {
                params: {
                    query,
                    page,
                }
            });
            const searchData = data.results;
            console.log(searchData);
            createMoviesForPages(searchData, moviesContainer, { lazyLoading: true, clean: false });
        }
    }
}

async function getTrendingMovies() {
    // moviesContainer.innerHTML = "";
    const { data } = await apiBaseURL("trending/movie/day");
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(movies);
    console.log(maxPage);
    
    if(movies.length === 0) {
        moviesContainer.textContent = `I'm sorry, no movies found`;
    } else {
        createMoviesForPages(movies, moviesContainer, { lazyLoading: true });
    }
}

async function getPaginatedTrendingMovies() {
    const { 
        scrollTop,
        scrollHeight,
        clientHeight 
    } = document.documentElement;
    const pageIsNotMax = page < maxPage;
    const scrollReachedBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if(scrollReachedBottom && pageIsNotMax) {
        page++;
        const { data } = await apiBaseURL("trending/movie/day", {
            params: {
                page,
            }
        });
        console.log(data);
        const movies = data.results;
        console.log(movies);
        createMoviesForPages(movies, moviesContainer, { lazyLoading: true, clean: false });
    }
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