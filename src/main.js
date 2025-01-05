async function getTrendingMoviesPreview() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,	
        },
    };
    const response = await fetch("https://api.themoviedb.org/3/trending/movie/day", options);
    const data = await response.json();
    const movies = data.results;
    console.log(movies);
    movies.forEach((movie) => {
        const trendingMoviesSection = document.querySelector(".trending__movies");
        const movieContainer = document.createElement("div");
        const movieImageContainer = document.createElement("figure");
        const moviePoster = document.createElement("img");
        const movieTitle = document.createElement("h3");
        const movieDescription = document.createElement("p");
        movieContainer.classList.add("movies__movie-container");
        movieImageContainer.classList.add("container__poster");
        moviePoster.classList.add("poster__image");
        moviePoster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        moviePoster.alt = movie.title;
        movieTitle.classList.add("movies__info");
        movieTitle.textContent = movie.title;
        movieDescription.classList.add("movies__info");
        // movieDescription.textContent = movie.overview;
        trendingMoviesSection.appendChild(movieContainer);
        movieContainer.append(movieImageContainer, movieTitle, movieDescription);  
        movieImageContainer.appendChild(moviePoster);

    });
}

getTrendingMoviesPreview();