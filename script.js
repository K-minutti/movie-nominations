const formField = document.getElementById("search-bar-form");
const resultItems = document.getElementById("results-items-container");
const nominationsContainer = document.getElementById("nominations");
const alternativeMoviePoster =
  "https://images.unsplash.com/photo-1608533371942-daebef51bc40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80";

let movies = [];
const nominations = [];

const searchMovies = async (text) => {
  try {
    const queryString = `http://www.omdbapi.com/?s=${text}&type=movie&page=50&apikey=f78d61a1`;
    const res = await fetch(queryString);
    const get_movies = await res.json();
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
    .map((movie, index) => {
      let poster = movie["Poster"];
      if (poster == "N/A") {
        poster = alternativeMoviePoster;
      }
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
                    <button id="${index}" onclick="addNomination(${index})" class="nominate-result-button" >nominate</button>
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
      <button class="remove-button" onclick="removeNomination(${index})">remove</button>
    </div>
  </div> 
    `;
    })
    .join("");

  nominationsContainer.innerHTML = htmlInsert;
};

const addNomination = (index) => {
  let movieData = movies[index];
  if (nominations.length < 5) {
    document.getElementsByClassName("nominate-result-button")[
      index
    ].disabled = true;
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

const userAlert = (type) => {
  if (type == "toast") {
    let htmlNotifInsert = `
      <div class="toast-notification">You have 2 nominations left.</div>
    `;
    document.getElementsByClassName(
      "nominations-header"
    )[0].innerHTML = htmlNotifInsert;
  }

  setTimeout(function () {
    document.getElementsByClassName("nominations-header")[0].innerText =
      "Your Nominations";
  }, 3000);

  if (type == "banner") {
    let banner = document.createElement("div");
    banner.className = "banner-notification";
    banner.innerText = "You Did it! You reached a total of 5 nominations.";
    document.body.appendChild(banner);

    setTimeout(function () {
      document.getElementsByClassName("banner-notification")[0].style.display =
        "none";
    }, 10000);
  }
};

const removeNomination = (index) => {
  nominations.splice(index, 1);
  document.getElementsByClassName("nominate-result-button")[
    index
  ].disabled = false;
  displayMovies(movies);
  displayNominations(nominations);
};

const loadWelcomeMovieSelection = async () => {
  const results = await searchMovies("Code");
  displayMovies(results);
};

loadWelcomeMovieSelection();
