const formField = document.getElementById("search-bar-form");
const resultItems = document.getElementById("results-items-container");
let movies = [];
// let movies = {
//   Search: [
//     {
//       Title: "A Little Lust",
//       Year: "2015",
//       imdbID: "tt4536304",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BYmRkM2NiYWMtYzg0ZC00NTc5LTlmMmUtYmRhZDllNmUwMjM3XkEyXkFqcGdeQXVyNjU2Mzc1MzA@._V1_SX300.jpg",
//     },
//     {
//       Title: "Little Dragon Maiden",
//       Year: "1983",
//       imdbID: "tt0084256",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BNmRiMDJjZWItMDYzYy00Yzk2LWJiMjQtYjdlYmVmODk3MDQ5XkEyXkFqcGdeQXVyNDUxNjc5NjY@._V1_SX300.jpg",
//     },
//     {
//       Title: "Little Beau Porky",
//       Year: "1936",
//       imdbID: "tt0027891",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BZWY4ZTEzMTYtNmQ4Yy00MzNjLWFlOTMtZDc3NDM0MGI3NDBmXkEyXkFqcGdeQXVyNjMxMzM3NDI@._V1_SX300.jpg",
//     },
//     {
//       Title: "The Little Train Robbery",
//       Year: "1905",
//       imdbID: "tt0000521",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BNjk2ODkzMDktOTA0OC00YmQ2LThlZWItZTliZWQ5NzM5MzU4XkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_SX300.jpg",
//     },
//     {
//       Title: "Little House Years",
//       Year: "1979",
//       imdbID: "tt0236433",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BYjFlNDZjZDktOTA0NS00OWQ5LWJjNzMtYTY5ZGY0MzM0ODEzXkEyXkFqcGdeQXVyMzM4MDQ2MjE@._V1_SX300.jpg",
//     },
//     {
//       Title: "Little Girls in Pretty Boxes",
//       Year: "1997",
//       imdbID: "tt0119551",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BYmNjMDVhMzQtNmE1Yi00M2JhLWJhNGUtZjgwMDc2N2UzMDBmXkEyXkFqcGdeQXVyMTI2OTM0NzQ@._V1_SX300.jpg",
//     },
//     {
//       Title: "Little World",
//       Year: "2012",
//       imdbID: "tt1838723",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BMTgxNjQ5NDYxMV5BMl5BanBnXkFtZTcwMTgxMzUxOQ@@._V1_SX300.jpg",
//     },
//     {
//       Title: "Seven Little Monsters",
//       Year: "2000–2003",
//       imdbID: "tt0274284",
//       Type: "series",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BNjIyNTM0ODkxM15BMl5BanBnXkFtZTcwMDMzMzYyMQ@@._V1_SX300.jpg",
//     },
//     {
//       Title: "7 Little Johnstons",
//       Year: "2013–",
//       imdbID: "tt3746948",
//       Type: "series",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BMWE5YTVlYjYtZjVjMi00MDMxLTgyYzMtNmZjYjRkOTMwNWE5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     },
//     {
//       Title: "Little John",
//       Year: "2002",
//       imdbID: "tt0307101",
//       Type: "movie",
//       Poster:
//         "https://m.media-amazon.com/images/M/MV5BMDllNjY5ZDUtMDc3Ny00YTlmLTljNTAtZTUyMzg5MzA4Y2I3XkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_SX300.jpg",
//     },
//   ],
//   totalResults: "5604",
//   Response: "True",
// };

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

const loadWelcomeMovieSelection = async () => {
  const results = await searchMovies("Adventure");
  displayMovies(results);
};

const displaySearchError = (res) => {
  resultItems.innerHTML = res;
};

const displayMovies = (movies) => {
  const alternativeMoviePoster =
    "https://images.unsplash.com/photo-1608533371942-daebef51bc40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80";

  const htmlInsert = movies
    .map((movie) => {
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
