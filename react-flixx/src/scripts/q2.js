function getFilms() {
  let xhr = new XMLHttpRequest();

  try {
    xhr.open("GET", "https://api.flixpremiere.com/v1/films/filter/now_showing?limit=10");

    xhr.send();

    let jsonFilms = {};
    xhr.onload = () => {
      jsonFilms = JSON.parse(xhr.responseText);
      jsonFilms = jsonFilms.films;
      let eligibleFilms = [];

      for (let jsonFilm of jsonFilms) {
        if (jsonFilm.duration_seconds >= 5500) {
          eligibleFilms.push(jsonFilm);
          console.log(jsonFilm.title + " (" + jsonFilm.duration_seconds + ")");
        }
      }
    }
  } catch(error) {
    console.log(error);
  }
  setTimeout(getFilms, 5000);
}
getFilms();
