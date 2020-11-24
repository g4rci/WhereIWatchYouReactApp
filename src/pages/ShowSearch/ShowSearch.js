import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../MovieSearch/MoviSearch.css";

function MovieSearch(props) {
  const serchApiStart = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es&query=`;
  const searchApiFin = "&page=1&include_adult=false&region=es";
  const urlStart = props.match.params.name.toLowerCase();
  const temp = escape(urlStart);
  const url = serchApiStart + temp + searchApiFin;
  const [listOfMatch, setListOfMatch] = useState([]);

  const getShowSearch = async () => {
    await axios.get(url).then((responseFromApi) => {
      setListOfMatch(responseFromApi.data.results);
    });
  };

  useEffect(function () {
    getShowSearch();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="sections">
      <div className="moviesearchbackground"></div>
      <div id="container">
        {listOfMatch.map((show) => {
          return (
            <div key={show.id} className="cardList">
              <div className={listOfMatch.length > 1 ? "cards" : "cards2"}>
                {!show.poster_path ? (
                  <p className="movieTtitle">{show.name}</p>
                ) : (
                  <p className="movieTtitle">
                    <span>.</span>
                  </p>
                )}
                <Card style={{ heigth: "100%" }}>
                  <Link to={`/moviedetails/${show.id}`} 
                    className="card_link"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {!show.poster_path ? (
                      <Card.Img
                        variant="top"
                        src={`https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg`}
                      />
                      
                    ) : (
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500//${show.poster_path}`}
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


