import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";

function AnimationMovies(props) {
  const [listOfMovies, setListOfMovies] = useState([]);
  const getAnimationMovies = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16,10751`
      )
      .then((responseFromApi) => {
        setListOfMovies(responseFromApi.data.results);
      });
  };
  useEffect(function () {
    getAnimationMovies();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key="animation">
      <div className="title">
        <h5 className="bg-dark" variant="dark">
          Animación y Familiar
        </h5>
      </div>
      <ScrollContainer id="_container">
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

export default AnimationMovies;
