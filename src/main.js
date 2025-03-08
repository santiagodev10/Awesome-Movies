//Data
let preferredLanguage = "en";
navigator.language = preferredLanguage;	
const apiBaseURL = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
    },
    params: 
    { 
        "language": navigator.language = preferredLanguage,
    }
})

function likedMoviesList() {
    const item = localStorage.getItem("liked_movies");
    let movies;
    if(item) {
        movies = JSON.parse(item);
    } else {
        movies = {};
    }
    return movies;
}

function likeMovie(movie) {
    console.log(likedMoviesList());
    const likedMovies = likedMoviesList();
    if(likedMovies[movie.id]) {	
        console.log("ya esta en LS, hay que eliminarla");
        delete likedMovies[movie.id];
    } else {
        console.log("no esta en LS, hay que agregarla");
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem("liked_movies", JSON.stringify(likedMovies));
}

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
    
        likedMoviesList()[movie.id] ? likeButton.classList.add("like-button--liked") : null;

        likeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            console.log("LIKE");
            likeButton.classList.toggle("like-button--liked");
            //AQUI SE GUARDA EN LOCAL STORAGE
            likeMovie(movie);
            getLikedMovies();
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
        
        movieContainer.addEventListener("click", () => {
            if (!movieContainer.classList.contains("image-error")) {
                location.hash = `#movie=${movie.id}`;
            }        
        });

        likedMoviesList()[movie.id] ? likeButton.classList.add("like-button--liked") : null;

        likeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            console.log("LIKE");
            likeButton.classList.toggle("like-button--liked");
            //AQUI SE GUARDA EN LOCAL STORAGE
            likeMovie(movie);
            getLikedMovies();
        })

        if(lazyLoading) {
            lazyLoader.observe(moviePoster);
        }
    });
}

function createCategories(categories, container) {
    categoriesArticle.innerHTML = "";
    categories.forEach((category) => {
        const categoryContainer = document.createElement("div");
        const categoryTitle = document.createElement("h3");
        categoryContainer.classList.add("categories-container__category");
        categoryContainer.classList.add("dropdown-item");
        categoryTitle.classList.add("categories-container__title");
        categoryTitle.classList.add("dropdown-item-title");
        categoryTitle.textContent = category.name;
        categoryTitle.id = category.id;
        categoryTitle.addEventListener("click", () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        container.appendChild(categoryContainer);
        categoryContainer.append(categoryTitle);
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
    createCategories(categoriesData, categoriesArticle);
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
    const translationList = translations();

    translationList.forEach((item) => {
        if(item.lang === preferredLanguage) {
            movieDetailsPoster.src = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
            movieDetailsTitle.textContent = movies.title;
            movieDetailsDescription.textContent = movies.overview;
            movieDetailsReleaseDate.textContent = `${item.movieDetailsCaptions.releaseDate}${movies.release_date}`;
            movieDetailsGenres.textContent = `${item.movieDetailsCaptions.genres}${movies.genres.map((genre) => genre.name).join(", ")}`;
            movieDetailsRating.textContent = `${item.movieDetailsCaptions.rating}${movies.vote_average.toFixed(1)} ⭐`;
            movieDetailsRuntime.textContent = `${item.movieDetailsCaptions.runtime}${movies.runtime}${item.movieDetailsCaptions.minutes}`;
            movieDetailsRelatedMoviesTitle.textContent = item.movieDetailsCaptions.relatedMovies;
        }
        getRelatedMoviesPreview(movieId);
    });

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

function getLikedMovies () {
    const likedMovies = likedMoviesList();
    const likedMoviesArray = Object.values(likedMovies);
    console.log(likedMoviesArray);
    createMoviesForHome(likedMoviesArray, likedMoviesContainer, { lazyLoading: true, clean: true });
}

async function getLanguages() {
    const { data } = await apiBaseURL("configuration/languages");
    const languages = data;
    const selectedNames = languages.filter((language) => language.english_name === "English" ||language.english_name === "Spanish");
    console.log(selectedNames);
    if (!localStorage.getItem("languages")) {
        localStorage.setItem("languages", JSON.stringify(selectedNames));        
    }
}

function translations () {    
    const langs =  [
        {
            lang: 'es',
            backButton: 'Volver',
            dropdownMenuCaptions: 
            {
                home: 'Inicio',
                trends: 'Tendencias',
                categories: 'Categorías ⬇️',
                upcoming: 'Próximamente',
                search: 'Búsqueda',
                favoriteMovies: 'Peliculas Favoritas',
                languages: 'Idiomas ⬇️',
                languagesItems: 
                {
                    english: 'Inglés',
                    spanish: 'Español',
                },
            },
            searchInput: "Busca una película",
            homePageCaptions: 
            {
                trending: 'En Tendencia',
                seeMoreButton: 'Ver más',
                upcoming: 'Próximamente',
                favoriteMovies: 'Películas Favoritas',
            },
            footerCaption: "Hecho por santiagoDev 🤖",
            searchPageCaption: "Buscaste: ",
            movieDetailsCaptions: {
                releaseDate: "Fecha de estreno: ",
                genres: "Géneros: ",
                rating: "Calificación: ",
                runtime: "Duración: ",
                minutes: " minutos",
                relatedMovies: "Películas Relacionadas",
            },
        },
        {
            lang: 'en',
            backButton: 'Back',
            dropdownMenuCaptions: 
            {
                home: 'Home',
                trends: 'Trends',
                categories: 'Categories ⬇️',
                upcoming: 'Upcoming',
                search: 'Search',
                favoriteMovies: 'Favorite Movies',
                languages: 'Languages ⬇️',
                languagesItems: 
                {
                    english: 'English',
                    spanish: 'Spanish',
                },
            },
            searchInput: "Search for a movie",
            homePageCaptions: 
            {
                trending: 'Trending',
                seeMoreButton: 'See More',
                upcoming: 'Upcoming',
                favoriteMovies: 'Favorite Movies',
            },
            footerCaption: "Made by santiagoDev 🤖",
            searchPageCaption: "You searched for: ",
            movieDetailsCaptions: {
                releaseDate: "Release Date: ",
                genres: "Genres: ",
                rating: "Rating: ",
                runtime: "Runtime: ",
                minutes: " minutes",
                relatedMovies: "Related Movies",
            },        
        },
    ]

    return langs;
}

function changeLanguage(languageIsoCode) {
    console.log(languageIsoCode);
    const languageList = JSON.parse(localStorage.getItem("languages"));
    const selectedLang = languageList.find((language) => language.iso_639_1 === languageIsoCode);
    console.log(selectedLang);
    const translationList = translations();
    console.log(translationList);

    translationList.forEach((item) => {
        if(item.lang === selectedLang.iso_639_1) {
            preferredLanguage = selectedLang.iso_639_1;
            //Header
            homeLink.textContent = item.dropdownMenuCaptions.home;
            trendsLink.textContent = item.dropdownMenuCaptions.trends;
            categoriesLink.textContent = item.dropdownMenuCaptions.categories;
            upcomingLink.textContent = item.dropdownMenuCaptions.upcoming;
            searchLink.textContent = item.dropdownMenuCaptions.search;
            favoritesLink.textContent = item.dropdownMenuCaptions.favoriteMovies;
            languageLink.textContent = item.dropdownMenuCaptions.languages;
            
            // Actualizar los textos dentro de languageArticle
            const languageItem = document.querySelectorAll(".language-item__text");
            
            languageItem.forEach(element => {
                console.log(element);
                const language = element.getAttribute("iso-code");
                const languageName = language === "en" ? "english" : "spanish";
                element.textContent = item.dropdownMenuCaptions.languagesItems[languageName];
            });
            
            //Search
            searchInput.placeholder = item.searchInput;
            
            //HomePage
            trendingTitle.textContent = item.homePageCaptions.trending;
            trendingButton.textContent = item.homePageCaptions.seeMoreButton;
            upcomingTitle.textContent = item.homePageCaptions.upcoming;
            upcomingButton.textContent = item.homePageCaptions.seeMoreButton;
            favoriteTitle.textContent = item.homePageCaptions.favoriteMovies;
            console.log(favoriteTitle);
            
            //Footer
            footerCaption.textContent = item.footerCaption;
    
            //Back button
            backButton.textContent = item.backButton;
            backButton.appendChild(backButtonIcon);
    
            // Actualizar el idioma en la configuración de axios
            apiBaseURL.defaults.params.language = preferredLanguage;

            // Volviendo a cargar los posters y la información de las películas con el idioma actualizado del navegador segun la pagina actual            
            //PAGES
            if(location.hash.startsWith("#trends")) {
                titlePage.textContent = item.homePageCaptions.trending;
                getTrendingMovies();
                getCategoriesPreview();
            } else if(location.hash.startsWith("#category")) {
                const [_, movieId] = location.hash.split("=");
                console.log(movieId);
                
                const category = movieId.split("-");
                console.log(category);
                location.hash = `#category=${category[0]}-${category[1]}`;
                                
                titlePage.textContent = category[1];
                getMoviesByCategory(category[0]);
                getCategoriesPreview();

            } else if(location.hash.startsWith("#search")) {
                const [_, query] = location.hash.split("=");
                const formattedQuery = decodeURI(query);
                titlePage.textContent = `${item.searchPageCaption}${formattedQuery}`;
                getMoviesBySearch(query);
                getCategoriesPreview();
            } else if(location.hash.startsWith("#movie")) {
                movieDetailsRelatedMoviesTitle.textContent = item.movieDetailsCaptions.relatedMovies;
                movieDetailsReleaseDate.textContent = `${item.movieDetailsCaptions.releaseDate}`;
                movieDetailsGenres.textContent = `${item.movieDetailsCaptions.genres}`;
                movieDetailsRating.textContent = `${item.movieDetailsCaptions.rating}`;
                movieDetailsRuntime.textContent = `${item.movieDetailsCaptions.runtime}`;
                getMovieById(location.hash.split("=")[1]);
                getCategoriesPreview();
            } else {
                getTrendingMoviesPreview();
                getCategoriesPreview();
                getUpcomingMoviesPreview();
                getLikedMovies();
            }
        }
    });    
}