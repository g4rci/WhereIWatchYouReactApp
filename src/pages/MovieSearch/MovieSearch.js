import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MoviSearch.css";

function MovieSearch(props) {
  const serchApiStart = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es&query=`;
  const searchApiFin = "&page=1&include_adult=false&region=es";
  const urlStart = props.match.params.name.toLowerCase();
  const temp = escape(urlStart);
  const url = serchApiStart + temp + searchApiFin;
  const [listOfMatch, setListOfMatch] = useState([]);

  const getMovieSearch = async () => {
    await axios.get(url).then((responseFromApi) => {
      setListOfMatch(responseFromApi.data.results);
    });
  };

  useEffect(function () {
    getMovieSearch();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sections">
      <div className="moviesearchbackground"></div>
      <div id="container">
        {listOfMatch.map((movie) => {
          return (
            <div key={movie.id} className="cardList">
              <div className={listOfMatch.length > 1 ? "cards" : "cards2"}>
                {!movie.backdrop_path ? (
                  <p className="movieTtitle">{movie.title}</p>
                ) : (
                  <p className="movieTtitle">
                    <span>.</span>
                  </p>
                )}
                <Card style={{ heigth: "100%" }}>
                  <Link to={`/moviedetails/${movie.id}`} className="card_link">
                    {movie.backdrop_path ? (
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500//${movie.poster_path}`}
                      />
                    ) : (
                      <Card.Img
                        variant="top"
                        src={`https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg`}
                      />
                    )}
                  </Link>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieSearch;


