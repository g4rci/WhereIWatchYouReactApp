import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'
import './Carousel.css'
import { Link } from "react-router-dom";


function TopShows() {
  const [listOfShows, setListOfShows] = useState([]);

  const getTopShows = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`      )
      .then((responseFromApi) => {
        setListOfShows(responseFromApi.data.results);
      });
  };

  useEffect(function () {
    getTopShows();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
    
    return (
     <div>
    <Carousel>
      {listOfShows.map((show) => {
        return (
        <Carousel.Item key={show.id}>
        <Link to={`/showdetails/${show.id}`} className="card_link" onClick={() => window.scrollTo(0, 0)}
>
            <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/w500//${show.backdrop_path}`}
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>{show.title}</h3>
            <p>{show.overview}</p>
            </Carousel.Caption>
        </Link>
        </Carousel.Item>
        );
      })}
      </Carousel>
    </div>
  );
}

export default TopShows;
