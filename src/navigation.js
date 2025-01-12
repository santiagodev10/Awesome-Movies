window.addEventListener("DOMContentLoaded", navigator);
window.addEventListener("hashchange", navigator);
nav.addEventListener("click", (event) => {
    const target = event.target;

    if(target.closest('.logo')) {
        console.log("LOGO");
    } else if(target.closest('.nav-links-container')) {
        console.log("NAV LINKS");
        navLinks.classList.toggle("inactive");
        navLinks.classList.toggle("active");
    } else if(target.closest('.search')) {
        console.log("SEARCH");
    }
})

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