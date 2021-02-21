import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.css'
import { Link } from "react-router-dom";


function TopMovies() {
  const [listOfMovies, setListOfMovies] = useState([]);

  const getTopMovies = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es&sort_by=popularity.desc&include_adult=false&include_video=false`
      )
      .then((responseFromApi) => {
        setListOfMovies(responseFromApi.data.results);
      });
  };

  useEffect(function () {
    getTopMovies();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
    
    return (
     <div>
    <Carousel>
      {listOfMovies.map((movie) => {
        return (
        <Carousel.Item key={movie.id}>
        <Link to={`/moviedetails/${movie.id}`} className="card_link" onClick={() => window.scrollTo(0, 0)}
>
            <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/w500//${movie.backdrop_path}`}
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            </Carousel.Caption>
        </Link>
        </Carousel.Item>
        );
      })}
      </Carousel>
    </div>
  );
}

export default TopMovies;
