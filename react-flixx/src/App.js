import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let eligibleFilms = [""];
function getFilms() {
  let xhr = new XMLHttpRequest();

  try {
    xhr.open("GET", "https://api.flixpremiere.com/v1/films/filter/now_showing?limit=10");

    xhr.send();

    let jsonFilms = {};
    xhr.onload = () => {
      jsonFilms = JSON.parse(xhr.responseText);
      jsonFilms = jsonFilms.films;
      let _eligibleFilms = [];

      for (let jsonFilm of jsonFilms) {
        if (jsonFilm.duration_seconds >= 5500) {
          // _eligibleFilms.push(jsonFilm);
          // console.log(jsonFilm.title + " (" + jsonFilm.duration_seconds + ")");
          _eligibleFilms.push(jsonFilm.title + " (" + jsonFilm.duration_seconds + ")");
          // _eligibleFilms = {film: "ok"};
        }
      }
      eligibleFilms = _eligibleFilms;

    }
  } catch(error) {
    alert(error);
    eligibleFilms = error;
  }
  setTimeout(getFilms, 5000);
}

class FilmComponent extends Component {
  constructor(props){
    super(props);
    getFilms();
    this.state = { films: eligibleFilms };
  }
  render(){
    let films = this.state.films;
    return(
      // <div> { this.state.films } </div>
       <>
       <ul>
        {this.state.films.map(film => (<li>{film}</li>))} 
                </ul>
       </>
    );
  }
  componentDidMount() {
    console.log("TimeComponent Mounted...")
    this.interval = setInterval(() => {
      getFilms();
      this.setState({ films: eligibleFilms });
      console.log(eligibleFilms);
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

function App() {
  return (
    <div className="App">
      <FilmComponent/>
    </div>
  );
}

export default App;

