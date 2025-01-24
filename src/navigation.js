window.addEventListener("DOMContentLoaded", navigator);
window.addEventListener("hashchange", navigator);
trendingButton.addEventListener("click", () => {
    location.hash = "#trends"
});
categoriesContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (target.closest(".categories-container__category")) {
        const categoryTitle = target.closest(".categories-container__title");
        // specificCategoryTitle.textContent = categoryTitle.textContent;
        location.hash = `#category=${categoryTitle.id}-${categoryTitle.textContent}`;
    }
})
headerLogo.addEventListener("click", () => {
    location.hash = "#home";
});
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
        searchInput.type = "search";
        searchInput.classList.add("search__input");
        searchInput.id = "search-input";
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

        searchInput.addEventListener("keydown", (event) => {
            if(event.key === "Enter") {
                console.log("ENTER");
                event.preventDefault();
                location.hash = `#search=${searchInput.value}`;
            }
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

    window.scrollTo(0, 0);
}

function homePage () {
    console.log("HOME");
    trending.classList.remove("inactive");
    categories.classList.remove("inactive");
    upcoming.classList.remove("inactive");
    genericPage.classList.remove("specific-category-page");
    genericPage.classList.add("inactive");
    trendsPageSection.classList.add("inactive");
    getTrendingMoviesPreview();
    getCategoriesPreview();
    getUpcomingMoviesPreview();
}

function trendsPage () {
    console.log("TRENDS");
    trending.classList.add("inactive");
    categories.classList.add("inactive");
    upcoming.classList.add("inactive");
    genericPage.classList.add("inactive");
    trendsPageSection.classList.remove("inactive");
}   

function searchPage () {
    console.log("SEARCH");
    genericPage.classList.remove("specific-category-page");
    genericPage.classList.remove("inactive");
    trending.classList.add("inactive");
    categories.classList.add("inactive");
    upcoming.classList.add("inactive");
    trendsPageSection.classList.add("inactive");
    genericPage.classList.add("search-page");

    const [_, query] = location.hash.split("=");
    titlePage.textContent = `You searched for: "${query}"`;
    getMoviesBySearch(query);
}

function movieDetailsPage () {
    console.log("MOVIE DETAILS");
}

function categoriesPage () {    
    console.log("CATEGORIES");
    trending.classList.add("inactive");
    categories.classList.add("inactive");
    upcoming.classList.add("inactive");
    trendsPageSection.classList.add("inactive");
    genericPage.classList.remove("inactive");
    genericPage.classList.remove("search-page");
    genericPage.classList.add("specific-category-page");

    location.hash.split("=").forEach((category) => {
        const [id, name] = category.split("-");
        console.log(id);
        //las URLs no pueden tener espacios vacios, por eso cuando se encuentra con uno, lo reemplaza por %20, por eso se usa decodeURI para que lo convierta a un espacio vacio de nuevo
        const formattedTitle = decodeURI(name);
        titlePage.textContent = formattedTitle;
        
        getMoviesByCategory(id);
    });
}