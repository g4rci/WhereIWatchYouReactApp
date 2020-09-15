import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";

function ActionMovies(props) {
  const [listOfMovies, setListOfMovies] = useState([]);
  const getActionMovies = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28,12`
      )
      .then((responseFromApi) => {
        setListOfMovies(responseFromApi.data.results);
      });
  };
  useEffect(function () {
    getActionMovies();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key="action">
      <div className="title">
        <h5 className="bg-dark" variant="dark">
          Acción y Aventura
        </h5>
      </div>
      <ScrollContainer>
        <div id="_container">
          {listOfMovies.map((movie) => {
            return (
              <div key={movie.id} className="_cardList">
                <div className="_cards">
                  <Card style={{ heigth: "100%" }}>
                    <Link
                      to={`/moviedetails/${movie.id}`}
                      className="card_link"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500//${movie.poster_path}`}
                      />
                    </Link>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollContainer>
    </div>
  );
}

export default ActionMovies;
