let maxPage;
let page = 1;
let infiniteScroll;

window.addEventListener("DOMContentLoaded", navigationHandler);
window.addEventListener("hashchange", navigationHandler);
window.addEventListener("scroll", infiniteScroll, { passive: true });

backButton.addEventListener("click", () => {
    window.history.back();
});

trendingButton.addEventListener("click", () => {
    location.hash = "#trends"
});

headerLogo.addEventListener("click", () => {
    location.hash = "#home";
});

nav.addEventListener("click", (event) => {
    const target = event.target;

    if(target.closest('.logo')) {
        console.log("LOGO");
    } else if(target.closest('.search')) {
        console.log("SEARCH");
        
        headerLogo.classList.toggle("hide");
        navLinksContainer.classList.toggle("hide");
        searchButton.classList.toggle("hide");
        searchInput.classList.toggle("hide");
        closeButtonContainer.classList.toggle("hide");
        const closeSearch = () => {
            searchInput.classList.toggle("hide");
            closeButtonContainer.classList.toggle("hide");
            headerLogo.classList.toggle("hide");
            navLinksContainer.classList.toggle("hide");
            searchButton.classList.toggle("hide");

            // Eliminar el listener después de que se haya ejecutado una vez
            closeButtonContainer.removeEventListener("click", closeSearch);
        };

        closeButtonContainer.addEventListener("click", closeSearch);
    
        searchInput.addEventListener("keydown", (event) => {
            if(event.key === "Enter") {
                console.log("ENTER");
                event.preventDefault();
                location.hash = `#search=${searchInput.value}`;
            }       
        });
    }
})

navLinksContainer.addEventListener("click", () => {
    navLinksContainer.classList.toggle("change");
    navLinks.classList.toggle("inactive");
});

categoriesContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("CATEGORIES");
    categoriesSection.classList.toggle("inactive");
});

languageContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("LANGUAGE");
    languageSection.classList.toggle("inactive");
    //AQUI VA LA LOGICA PARA CAMBIAR EL LENGUAJE
    languageArticle.innerHTML = "";
    const languageList = JSON.parse(localStorage.getItem("languages"));
    console.log(languageList);
    languageList.forEach((language) => {
        const languageContainer = document.createElement("div");
        const languageItem = document.createElement("h3");
        languageContainer.classList.add("dropdown-item");
        languageContainer.classList.add("language-item");
        languageItem.classList.add("language-item__text");
        languageArticle.append(languageContainer);
        languageItem.textContent = language.english_name;
        languageItem.setAttribute("iso-code", language.iso_639_1);
        languageContainer.append(languageItem);
    });

});

languageArticle.addEventListener("click", (e) => {
    e.stopPropagation();
    const target = e.target;

    if(target.closest(".language-item")) {
        console.log("LANGUAGE ITEM");
        // console.log(target.textContent);
        
        changeLanguage(target.getAttribute("iso-code"));
    }
});

function navigationHandler() {
    console.log( {location} );

    if(infiniteScroll) {
        window.removeEventListener("scroll", infiniteScroll);
        infiniteScroll = undefined;
    }

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
    if(infiniteScroll) {
        window.addEventListener("scroll", infiniteScroll);
    }
}

function homePage () {
    console.log("HOME");
    body.classList.remove("dark-background");
    header.classList.remove("header-shadow");
    trending.classList.remove("inactive");
    // categories.classList.remove("inactive");
    upcoming.classList.remove("inactive");
    genericPage.classList.remove("specific-category-page");
    likeSection.classList.remove("inactive");
    backButton.classList.add("inactive");
    movieDetails.classList.add("inactive");
    genericPage.classList.add("inactive");    
    getTrendingMoviesPreview();
    getCategoriesPreview();
    getUpcomingMoviesPreview();
    getLikedMovies();
    getLanguages();
}

function trendsPage () {
    console.log("TRENDS");
    body.classList.remove("dark-background");
    header.classList.remove("header-shadow");
    trending.classList.add("inactive");
    // categories.classList.add("inactive");
    upcoming.classList.add("inactive");
    movieDetails.classList.add("inactive");
    likeSection.classList.add("inactive");
    genericPage.classList.remove("inactive");
    backButton.classList.remove("inactive");
    titlePage.textContent = "Trending Movies";
    getTrendingMovies();
    changeLanguage(preferredLanguage);
    
    infiniteScroll = getPaginatedTrendingMovies;
}   

function searchPage () {
    console.log("SEARCH");
    body.classList.remove("dark-background");
    header.classList.remove("header-shadow");
    genericPage.classList.remove("specific-category-page");
    genericPage.classList.remove("inactive");
    backButton.classList.remove("inactive");
    trending.classList.add("inactive");
    // categories.classList.add("inactive");
    upcoming.classList.add("inactive");
    genericPage.classList.add("search-page");
    movieDetails.classList.add("inactive");
    likeSection.classList.add("inactive");
    
    const [_, query] = location.hash.split("=");
    const formattedQuery = decodeURI(query);
    titlePage.textContent = `You searched for: "${formattedQuery}"`;
    getMoviesBySearch(query);
    changeLanguage(preferredLanguage);
    
    infiniteScroll = getPaginatedMoviesBySearch(query);
}

function movieDetailsPage () {
    console.log("MOVIE DETAILS");
    trending.classList.add("inactive");
    // categories.classList.add("inactive");
    upcoming.classList.add("inactive");
    genericPage.classList.add("inactive");
    header.classList.add("header-shadow");
    likeSection.classList.add("inactive");
    movieDetails.classList.remove("inactive");
    backButton.classList.remove("inactive");

    const [_, movieId] = location.hash.split("=");
    getMovieById(movieId);
    // changeLanguage(preferredLanguage);
}

function categoriesPage () {    
    console.log("CATEGORIES");
    header.classList.remove("header-shadow");
    backButton.classList.remove("inactive");
    genericPage.classList.remove("inactive");
    genericPage.classList.remove("search-page");
    trending.classList.add("inactive");
    // categories.classList.add("inactive");
    upcoming.classList.add("inactive");
    genericPage.classList.add("specific-category-page");
    movieDetails.classList.add("inactive");
    likeSection.classList.add("inactive");

    location.hash.split("=").forEach((category) => {
        const [id, name] = category.split("-");
        console.log(id);
        //las URLs no pueden tener espacios vacios, por eso cuando se encuentra con uno, lo reemplaza por %20, por eso se usa decodeURI para que lo convierta a un espacio vacio de nuevo
        const formattedTitle = decodeURI(name);
        titlePage.textContent = formattedTitle;
        
        getMoviesByCategory(id);
        changeLanguage(preferredLanguage);

        infiniteScroll = getPaginatedMoviesByCategory(id);
    });
}