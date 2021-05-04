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
  const fetchString =
    "http://www.omdbapi.com/?s=Little&type=movie&page=50&apikey=f78d61a1";
  try {
    const res = await fetch(fetchString);
    const for_movies = await res.json();
    movies = for_movies["Search"];
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

// {"Search":[{"Title":"A Little Lust","Year":"2015","imdbID":"tt4536304","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYmRkM2NiYWMtYzg0ZC00NTc5LTlmMmUtYmRhZDllNmUwMjM3XkEyXkFqcGdeQXVyNjU2Mzc1MzA@._V1_SX300.jpg"},{"Title":"Little Dragon Maiden","Year":"1983","imdbID":"tt0084256","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNmRiMDJjZWItMDYzYy00Yzk2LWJiMjQtYjdlYmVmODk3MDQ5XkEyXkFqcGdeQXVyNDUxNjc5NjY@._V1_SX300.jpg"},{"Title":"Little Beau Porky","Year":"1936","imdbID":"tt0027891","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZWY4ZTEzMTYtNmQ4Yy00MzNjLWFlOTMtZDc3NDM0MGI3NDBmXkEyXkFqcGdeQXVyNjMxMzM3NDI@._V1_SX300.jpg"},{"Title":"The Little Train Robbery","Year":"1905","imdbID":"tt0000521","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNjk2ODkzMDktOTA0OC00YmQ2LThlZWItZTliZWQ5NzM5MzU4XkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_SX300.jpg"},{"Title":"Little House Years","Year":"1979","imdbID":"tt0236433","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYjFlNDZjZDktOTA0NS00OWQ5LWJjNzMtYTY5ZGY0MzM0ODEzXkEyXkFqcGdeQXVyMzM4MDQ2MjE@._V1_SX300.jpg"},{"Title":"Little Girls in Pretty Boxes","Year":"1997","imdbID":"tt0119551","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYmNjMDVhMzQtNmE1Yi00M2JhLWJhNGUtZjgwMDc2N2UzMDBmXkEyXkFqcGdeQXVyMTI2OTM0NzQ@._V1_SX300.jpg"},{"Title":"Little World","Year":"2012","imdbID":"tt1838723","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTgxNjQ5NDYxMV5BMl5BanBnXkFtZTcwMTgxMzUxOQ@@._V1_SX300.jpg"},{"Title":"Seven Little Monsters","Year":"2000–2003","imdbID":"tt0274284","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BNjIyNTM0ODkxM15BMl5BanBnXkFtZTcwMDMzMzYyMQ@@._V1_SX300.jpg"},{"Title":"7 Little Johnstons","Year":"2013–","imdbID":"tt3746948","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMWE5YTVlYjYtZjVjMi00MDMxLTgyYzMtNmZjYjRkOTMwNWE5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Little John","Year":"2002","imdbID":"tt0307101","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDllNjY5ZDUtMDc3Ny00YTlmLTljNTAtZTUyMzg5MzA4Y2I3XkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_SX300.jpg"}],"totalResults":"5604","Response":"True"}
