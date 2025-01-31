//BODY
const body = document.querySelector('body');
//Header nodes
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const headerLogo = document.querySelector('.logo');
const navLinksContainer = document.querySelector('.nav-links-container');
const searchButton = document.querySelector('.search');
//Header nodes--nav links container
const bar1 = document.querySelector('.bar-1');
const bar2 = document.querySelector('.bar-2');
const bar3 = document.querySelector('.bar-3');
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');
//Footer
const footer = document.querySelector("footer");
//HOME PAGE
//Main
const backButton = document.querySelector(".back-button");
//Trending
const trending = document.querySelector(".trending");
const trendingMovies = document.querySelector(".trending__movies");
const trendingButton = document.querySelector(".trending-button");
//Categories
const categories = document.querySelector(".categories");
const categoriesContainer = document.querySelector(".categories__categories-container");
//Upcoming
const upcoming = document.querySelector(".upcoming");
const upcomingMovies = document.querySelector(".upcoming__movies");
const upcomingButton = document.querySelector(".upcoming-button");
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