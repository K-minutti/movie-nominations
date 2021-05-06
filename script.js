const formField = document.getElementById("search-bar-form");
const resultItems = document.getElementById("results-items-container");
const nominationsContainer = document.getElementById("nominations");
const alternativeMoviePoster =
  "https://images.unsplash.com/photo-1608533371942-daebef51bc40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80";

let movies = [];
let nominations = {};

const searchMovies = async (text) => {
  let searchMovies = [];
  try {
    let count = 1;
    while (count <= 5) {
      const queryString = `http://www.omdbapi.com/?s=${text}&type=movie&page=${count}&apikey=f78d61a1`;
      const res = await fetch(queryString);
      let getMovies = await res.json();
      getMovies = getMovies["Search"];
      if (res == getMovies) {
        break;
      } else {
        searchMovies = [...searchMovies, ...getMovies];
        count++;
      }
    }
    movies = searchMovies;
    let jsonMovies = movies.map(JSON.stringify);
    let uniqueMovies = new Set(jsonMovies);
    movies = Array.from(uniqueMovies).map(JSON.parse);

    movies.forEach((movie, index) => {
      movie["searchIndex"] = index;
      if (movie["Poster"] == "N/A") {
        movie["Poster"] = alternativeMoviePoster;
      }
    });
    console.log(movies);
    return movies;
  } catch (err) {
    console.error(err);
  }
};

formField.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const searchQuery = e.target.children[1].value;
    document.getElementById("searchString").innerText = searchQuery;
    const results = await searchMovies(searchQuery);
    if (results == undefined) {
      displaySearchError("Movie not found! Try again ... please");
    } else {
      displayMovies(results);
    }
  } catch (err) {
    console.error(err);
  }
});

const displaySearchError = (res) => {
  resultItems.innerHTML = res;
};

const displayMovies = (movies) => {
  const htmlInsert = movies
    .map((movie) => {
      let uniqueId = movie["imdbID"];
      let searchIndex = movie["searchIndex"];
      return `
        <div class="movie-result-card column">
            <div class="result-image-container display-flex-center">
                <img
                    class="result-img"
                    src="${movie["Poster"]}"
                />
            </div>  
            <div class="result-text-button column">
                <div class="result-text-items column">
                    <p class="result-title">${movie["Title"]}</p>
                    <p class="result-year">(${movie["Year"]})</p>
                </div>
                <div class="result-button-container column">
                    <button id="nominate-${uniqueId}" onclick="addNomination(${searchIndex}, '${uniqueId}')" class="nominate-result-button" >nominate</button>
                    
                </div>
            </div>
      </div>
        `;
    })
    .join("");
  resultItems.innerHTML = htmlInsert;
  disableButtons();
};

const addNomination = (searchIndex, id) => {
  let movieData = movies[searchIndex];
  let testLen = Object.keys(nominations).length;
  if (testLen < 5) {
    nominations[id] = movieData;
    disableButtons();
    displayNominations();
    let len = Object.keys(nominations).length;
    if (len == 3) {
      userAlert("toast");
    }
    if (len == 5) {
      userAlert("banner");
    }
  }
};

// LOOP Over object addNomination(${searchIndex}, ${uniqueId})
const displayNominations = () => {
  let htmlInsertItems = [];

  for (const key in nominations) {
    let movie = nominations[key];
    let uniqueId = movie["imdbID"];
    htmlInsertItems.push(`
      <div class="nomination row">
      <div class="nomination-img-container display-flex-center">
      <img
      class="nomination-img"
      src="${movie["Poster"]}"
    />
      </div>
      <div class="nomination-text">
        <p class="nomination-title">${movie["Title"]}</p>
        <p class="nomination-year">${movie["Year"]}</p>
      </div>
      <div class="nomination-button-container display-flex-center">
        <button class="remove-button" onclick="removeNomination('${uniqueId}')">remove</button>
      </div>
    </div> 
      `);
  }
  let htmlInsert = htmlInsertItems.join("");
  nominationsContainer.innerHTML = htmlInsert;
};

const disableButtons = () => {
  for (const key in nominations) {
    let id = "nominate-" + key;
    let element = document.getElementById(id);
    if (element) {
      element.disabled = true;
    }
  }
};

const removeNomination = (id) => {
  delete nominations[id];
  displayNominations();
  displayMovies(movies);
};

let nominationsAlertCount = 0;
const userAlert = (type) => {
  if (type == "toast" && nominationsAlertCount < 2) {
    nominationsAlertCount++;
    let htmlToastInsert = `
      <div class="toast-notification">You have 2 nominations left.</div>
    `;
    document.getElementsByClassName(
      "nominations-header"
    )[0].innerHTML = htmlToastInsert;
  }

  setTimeout(function () {
    document.getElementsByClassName("nominations-header")[0].innerText =
      "Your Nominations";
  }, 3500);

  if (type == "banner") {
    document.getElementById("banner-notification").style.visibility = "visible";
  }
};

const closeBanner = () => {
  document.getElementById("banner-notification").style.visibility = "hidden";
};

//Function for sorting array Ascending
function compareYear(a, b) {
  let aYear = Number(a.Year);
  let bYear = Number(b.Year);
  if (aYear < bYear) {
    return -1;
  } else if (aYear > bYear) {
    return 1;
  } else {
    return 0;
  }
}

let order = 1;
const toggleYearOrder = () => {
  order += 1;
  if (order == 1) {
    displayMovies(movies);
  }
  if (order == 2) {
    let moviesAscending = [...movies].sort(compareYear);
    moviesAscending = moviesAscending.reverse();
    displayMovies(moviesAscending);
  }
  if (order == 3) {
    let moviesDescending = [...movies].sort(compareYear);
    displayMovies(moviesDescending);
    order -= 3;
  }
};

const loadWelcomeMovieSelection = async () => {
  const results = await searchMovies("Code");
  displayMovies(results);
};

loadWelcomeMovieSelection();
