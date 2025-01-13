window.addEventListener("DOMContentLoaded", navigator);
window.addEventListener("hashchange", navigator);
nav.addEventListener("click", (event) => {
    const target = event.target;

    if(target.closest('.logo')) {
        console.log("LOGO");
    } else if(target.closest('.nav-links-container')) {
        console.log("NAV LINKS");
        navLinksContainer.classList.toggle("change");
        navLinks.classList.toggle("inactive");
        navLinks.classList.toggle("active");
    } else if(target.closest('.search')) {
        console.log("SEARCH");
        const searchInput = document.createElement("input");
        const closeButtonContainer = document.createElement("div");
        const closeButtonBar1 = document.createElement("div");
        const closeButtonBar2 = document.createElement("div");
        const closeButtonBar3 = document.createElement("div");
        headerLogo.classList.toggle("inactive");
        navLinksContainer.classList.toggle("inactive");
        searchInput.classList.add("search__input");
        searchInput.placeholder = "Search for a movie";
        closeButtonContainer.classList.add("search__close");
        closeButtonContainer.classList.toggle("change");
        closeButtonBar1.classList.toggle("bar-1");
        closeButtonBar1.classList.toggle("menu-icon");
        closeButtonBar2.classList.toggle("bar-2");
        closeButtonBar2.classList.toggle("menu-icon");
        closeButtonBar3.classList.toggle("bar-3");
        closeButtonBar3.classList.toggle("menu-icon");
        searchButton.classList.toggle("inactive");
        closeButtonContainer.append(closeButtonBar1, closeButtonBar2, closeButtonBar3);
        nav.append(closeButtonContainer, searchInput);

        closeButtonContainer.addEventListener("click", () => {
            searchInput.remove();
            closeButtonContainer.remove();
            headerLogo.classList.toggle("inactive");
            navLinksContainer.classList.toggle("inactive");
            searchButton.classList.toggle("inactive");
        });
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