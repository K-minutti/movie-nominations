const searchbar = document.getElementById("searchbar");
const resultItems = document.getElementById("results-items-container");
let movies = [];

// searchbar.addEventListener("keypress", (e) => {
//    if(e.key === 'Enter')
//   const query = e.target.value.toLowerCase();
//   const filteredCharacters = movies.filter((character) => {
//     return (
//       character.name.toLowerCase().includes(query) ||
//       character.house.toLowerCase().includes(query)
//     );
//   });
//   displayMovies(filteredCharacters);
// });
// super secret key = http://www.omdbapi.com/?i=tt3896198&apikey=f78d61a1
// const displayQueryResults = async (e) => {
//   if (e.key === "Enter") {
//     try {
//       const query = e.target.value.toLowerCase();
//       const res = await fetch("https://hp-api.herokuapp.com/api/characters");
//       movies = await res.json();
//       const filteredResults = movies.filter((movie) => {
//         return (
//           movie.name.toLowerCase().includes(query) ||
//           movie.house.toLowerCase().includes(query)
//         );
//       });
//       displayMovies(filteredResults);
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   e.preventDefault();
// };

const loadWelcomeMovieSelection = async () => {
  const fetchString = "http://www.omdbapi.com/?i=tt3896198&apikey=f78d61a1";
  try {
    const res = await fetch(fetchString);
    const for_movies = await res.json();
    movies = [for_movies];
    displayMovies(movies);
  } catch (err) {
    console.error(err);
  }
};

const displayMovies = (movies) => {
  const htmlInsert = movies
    .map((movie) => {
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
                    <button class="nominate-result-button">nominate</button>
                </div>
            </div>
      </div>
        `;
    })
    .join("");
  resultItems.innerHTML = htmlInsert;
};

loadWelcomeMovieSelection();
