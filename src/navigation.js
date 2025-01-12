window.addEventListener("DOMContentLoaded", navigator);
window.addEventListener("hashchange", navigator);

function navigator() {
    console.log( {location} );

    if(location.hash.startsWith("#trends")) {
        trendsPage();
    } else if(location.hash.startsWith("#search=")) {
        searchPage();
    } else if(location.hash.startsWith("#movie=")) {
        movieDetailsPage();
    } else if(location.hash.startsWith("#category=")) {
        categoriesPage();
    } else {
        homePage(); 
    }
}

function homePage () {
    console.log("HOME");
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage () {
    console.log("TRENDS");
}   

function searchPage () {
    console.log("SEARCH");
}

function movieDetailsPage () {
    console.log("MOVIE DETAILS");
}

function categoriesPage () {    
    console.log("CATEGORIES");
}