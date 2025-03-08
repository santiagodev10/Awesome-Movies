//BODY
const body = document.querySelector('body');
//Header nodes
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const headerLogo = document.querySelector('.logo');
const navLinksContainer = document.querySelector('.nav-links-container');
const searchButton = document.querySelector('.search');
//Header nodes--nav links container
const searchInput = document.querySelector('#search-input');
const closeButtonContainer = document.querySelector('.search__close');
const bar1 = document.querySelector('.bar-1');
const bar2 = document.querySelector('.bar-2');
const bar3 = document.querySelector('.bar-3');
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');
const homeLink = document.getElementById("home");
const trendsLink = document.getElementById("trending");
const categoriesLink = document.getElementById("categories");
const upcomingLink = document.getElementById("upcoming");
const searchLink = document.getElementById("search");
const favoritesLink = document.getElementById("favorite-movies");
const languageLink = document.getElementById("languages");
//Footer
const footer = document.querySelector("footer");
const footerCaption = document.querySelector(".footer-caption");
//HOME PAGE
//Main
const backButton = document.querySelector(".back-button");
const backButtonIcon = document.querySelector(".back-button__icon");
//Trending
const trending = document.querySelector(".trending");
const trendingTitle = document.querySelector(".trending-title");
const trendingMovies = document.querySelector(".trending__movies");
const trendingButton = document.querySelector(".trending-button");
//Categories
const categoriesContainer = document.querySelector(".categories-container");
const categoriesSection = document.querySelector(".categories-section");
const categoriesArticle = document.querySelector(".categories-article");
// const categoriesContainerLink = document.querySelector(".categories-container");
//Upcoming
const upcoming = document.querySelector(".upcoming");
const upcomingTitle = document.querySelector(".upcoming-title");
const upcomingMovies = document.querySelector(".upcoming__movies");
const upcomingButton = document.querySelector(".upcoming-button");
//Favorites
const likedMoviesContainer = document.querySelector(".liked-container");
const likeSection = document.querySelector("#favorites");
const favoriteTitle = document.querySelector(".liked-title");
//Language
const languageContainer = document.querySelector(".language-container");
const languageSection = document.querySelector(".language-section");
const languageArticle = document.querySelector(".language-article");
//CATEGORIES PAGE, SEARCH PAGE AND TRENDS PAGE
const genericPage = document.querySelector(".generic-page");
const titleContainer = document.querySelector(".title-container");
let titlePage = document.querySelector(".title-page");
const moviesContainer = document.querySelector(".movies-container");
//TRENDS PAGE
const trendsPageSection = document.querySelector(".trends-page");
//MOVIE DETAILS PAGE
const movieDetails = document.querySelector(".movie-details");
const movieDetailsContainer = document.querySelector(".movie-details__poster-container");
const movieDetailsPoster = document.querySelector(".movie-details__poster");
const movieDetailsTitle = document.querySelector(".movie-details__title");
const movieDetailsImage = document.querySelector(".movie-details__image");
const movieDetailsDescription = document.querySelector(".movie-details__overview");
const movieDetailsRating = document.querySelector(".movie-details__rating");
const movieDetailsGenres = document.querySelector(".movie-details__genres");
const movieDetailsReleaseDate = document.querySelector(".movie-details__release-date");
const movieDetailsRuntime = document.querySelector(".movie-details__runtime");
const movieDetailsRelatedMovies = document.querySelector(".movie-details__related-movies");
const movieDetailsRelatedMoviesContainer = document.querySelector(".related-movies__movies-container");
const movieDetailsRelatedMoviesTitle = document.querySelector(".related-movies__title");