const formField = document.getElementById("search-bar-form");
const resultItems = document.getElementById("results-items-container");
const nominationsContainer = document.getElementById("nominations");
const alternativeMoviePoster =
  "https://images.unsplash.com/photo-1608533371942-daebef51bc40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80";

let movies = [];
const nominations = [];
const nominationSearchIndices = [];

const searchMovies = async (text) => {
  try {
    const queryString = `http://www.omdbapi.com/?s=${text}&type=movie&page=50&apikey=f78d61a1`;
    const res = await fetch(queryString);
    const get_movies = await res.json();
    get_movies["Search"].forEach((movie, index) => {
      movie["searchIndex"] = index;
    });
    movies = get_movies["Search"];
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
      displaySearchError("Movie not found! Try again ...");
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
      let poster = movie["Poster"];
      if (poster == "N/A") {
        poster = alternativeMoviePoster;
      }
      let searchIndex = movie["searchIndex"];
      return `
        <div class="movie-result-card column">
            <div class="result-image-container display-flex-center">
         
                <img
                    class="result-img"
                    src="${poster}"
                />
            </div>  
            <div class="result-text-button column">
                <div class="result-text-items column">
                    <p class="result-title">${movie["Title"]}</p>
                    <p class="result-year">(${movie["Year"]})</p>
                </div>
                <div class="result-button-container column">
                    <button id="searchResult-${searchIndex}" onclick="addNomination(${searchIndex})" class="nominate-result-button" >nominate</button>
                </div>
            </div>
      </div>
        `;
    })
    .join("");
  resultItems.innerHTML = htmlInsert;
};

const displayNominations = (nominations) => {
  const htmlInsert = nominations
    .map((movie, index) => {
      let searchIndex = movie["searchIndex"];
      let poster = movie["Poster"];
      if (poster == "N/A") {
        poster = alternativeMoviePoster;
      }
      return `
    <div class="nomination row">
    <div class="nomination-img-container display-flex-center">
    <img
    class="nomination-img"
    src="${poster}"
  />
    </div>
    <div class="nomination-text">
      <p class="nomination-title">${movie["Title"]}</p>
      <p class="nomination-year">${movie["Year"]}</p>
    </div>
    <div class="nomination-button-container display-flex-center">
      <button class="remove-button" onclick="removeNomination(${index}, ${searchIndex})">remove</button>
    </div>
  </div> 
    `;
    })
    .join("");

  nominationsContainer.innerHTML = htmlInsert;
};

const disableButtons = (buttonIndicesArr) => {
  for (let i = 0; i < buttonIndicesArr.length; ++i) {
    let buttonId = "searchResult-" + buttonIndicesArr[i];
    document.getElementById(buttonId).disabled = true;
  }
};

const addNomination = (searchIndex) => {
  let movieData = movies[searchIndex];
  if (nominations.length < 5) {
    document.getElementById(`searchResult-${searchIndex}`).disabled = true;
    nominationSearchIndices.push(searchIndex);
    disableButtons(nominationSearchIndices);
    nominations.push(movieData);
    displayNominations(nominations);

    let nominationsLen = nominations.length;
    if (nominationsLen == 3) {
      userAlert("toast");
    }
    if (nominationsLen == 5) {
      userAlert("banner");
    }
  }
};

const removeNomination = (nominationIndex, searchIndex) => {
  nominations.splice(nominationIndex, 1);
  displayNominations(nominations);
  let searchIndexToRemove = nominationSearchIndices.indexOf(searchIndex);
  nominationSearchIndices.splice(searchIndexToRemove, 1);
  let buttonId = "searchResult-" + searchIndex;
  document.getElementById(buttonId).disabled = false;
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
    disableButtons(nominationSearchIndices);
  }
  if (order == 2) {
    let moviesAscending = [...movies].sort(compareYear);
    moviesAscending = moviesAscending.reverse();
    displayMovies(moviesAscending);
    disableButtons(nominationSearchIndices);
  }
  if (order == 3) {
    let moviesDescending = [...movies].sort(compareYear);
    displayMovies(moviesDescending);
    disableButtons(nominationSearchIndices);
    order -= 3;
  }
};

const loadWelcomeMovieSelection = async () => {
  const results = await searchMovies("Code");
  displayMovies(results);
};

loadWelcomeMovieSelection();
