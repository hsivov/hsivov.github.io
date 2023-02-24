const APIURL = 'https://api.themoviedb.org/3/movie/popular?api_key=a211128ffb2017323a82d7318992da84&page=1';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=a211128ffb2017323a82d7318992da84&language=en-US&page=1&include_adult=false&query='

const form = document.getElementById('form');
const search = document.getElementById('search');
const dropButton = document.getElementById('dropbtn');
const popup = document.getElementById('movie-popup');
let totalPages = 0;

const movieList = {
    movies: [],
    page: 1,
    url: ''
}

getMovies(APIURL);

async function getData(url){
    const response = await fetch(url);
    const responseData = await response.json();

    movieList.movies = responseData.results;
    movieList.page = responseData.page;
    movieList.url = url;
    totalPages = responseData.total_pages;
}

async function getMovies(url) {
    const main = document.querySelector('main');
    const pages = document.getElementById('pages');
    
    await getData(url);
    
    //clear main
    main.innerHTML = '';
    let index = 0;

    movieList.movies.forEach(movie => {
        const { poster_path, title, vote_average } = movie;
        const movieEl = document.createElement('div');

        movieEl.classList.add('movie');
        movieEl.setAttribute("id", index);
        movieEl.onclick = function () { showSelectedMovie(this.id) };

        movieEl.innerHTML = `
        <img 
        src="${IMGPATH + poster_path}"
        alt="${title}" />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class=${classByRate(vote_average)}>${vote_average}</span>
        </div>`

        main.appendChild(movieEl);
        index += 1;
    });
    pages.innerHTML = `Page ${movieList.page} of ${totalPages} pages.`
    if (movieList.page === 1) { document.getElementById('prev').hidden = true };
    movieList.page === totalPages ? document.getElementById('next').hidden = true : document.getElementById('next').hidden = false;
}

async function showSelectedMovie(id) {

    const moviePopupEl = document.createElement('div');

    //clear popup window first and make it visible
    popup.innerHTML = '';
    popup.classList.remove('hidden');

    moviePopupEl.setAttribute("class", "movie-details");
    moviePopupEl.innerHTML = `
        <button id="close-popup" class="close-popup" onclick="popup.classList.add('hidden');">
        <i class="fa-solid fa-xmark"></i></button>
        <h1>${movieList.movies[id].title}</h1>
        <img 
        src="${IMGPATH + movieList.movies[id].backdrop_path}"
        alt="${movieList.movies[id].title}" />
        <p>Release date: ${movieList.movies[id].release_date}</p>
        <h4>Overview:</h4>
        <p>${movieList.movies[id].overview}</p>
        <p>Average user vote: ${movieList.movies[id].vote_average}</p>
        <button id="voteBtn">Vote</button>`
    popup.appendChild(moviePopupEl);
}

function classByRate(vote) {
    if (vote >= 8) {
        return 'very-high';
    }
    else if (vote >= 7) {
        return 'high'
    }
    else {
        return 'average'
    }
}
// Event listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
    }
});

function getMoviesByRequest(request) {

    const updatedAPIURL = `https://api.themoviedb.org/3/movie/${request}?api_key=04c35731a5ee918f014970082a0088b1&page=1`;

    getMovies(updatedAPIURL);
    dropButton.innerHTML = document.getElementById(request).innerHTML;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function prevPage() {
    movieList.page -= 1;
    if (movieList.page === 1) { document.getElementById('prev').hidden = true };
    const url = movieList.url.replace(/\bpage=\d+/, `page=${movieList.page}`);

    getMovies(url);
}

function nextPage() {
    movieList.page += 1;
    if (movieList.page === totalPages) { document.getElementById('next').hidden = true };
    const url = movieList.url.replace(/\bpage=\d+/, `page=${movieList.page}`);
    document.getElementById('prev').hidden = false;

    getMovies(url);
}