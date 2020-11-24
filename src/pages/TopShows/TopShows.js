import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ShowsCarousel from "../../components/Carousel/SowsCarousel";
import "./../TopMovies/TopMovies.css";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import ActionShows from "../ShowLists/Action";
import ComedyShows from '../ShowLists/Comedy'
import ScyFyShows from "../ShowLists/ScyFy";
import AnimationShows from "../ShowLists/Animation";
import CrimeShows from "../ShowLists/Crime";
import TerrorShows from "../ShowLists/Terror";
import MusicShows from "../ShowLists/Music";

function TopMovies(props) {
  const [listOfShows, setListOfShows] = useState([]);
  const getTopShows = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`
      )
      .then((responseFromApi) => {
        setListOfShows(responseFromApi.data.results);
      });
  };
  useEffect(function () {
    getTopShows();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sections" key="ok">
      <ShowsCarousel />
      <div key="topmovies">
        <div className="title">
          <h5 className="bg-dark" variant="dark">
            Top 20
          </h5>
        </div>
        <ScrollContainer id="_container">
          <div id="_container">
            {listOfShows.map((shows) => {
              return (
                <div key={shows.id} className="_cardList">
                  <div className="_cards">
                    <Card style={{ heigth: "100%" }}>
                      <Link
                        to={`/showdetails/${shows.id}`}
                        className="card_link"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <Card.Img
                          variant="top"
                          src={`https://image.tmdb.org/t/p/w500//${shows.poster_path}`}
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
      <ActionShows />
      <ComedyShows />
      <ScyFyShows />
      <AnimationShows />
      <CrimeShows />
      <TerrorShows />
      <MusicShows />
    </div>
  );
}

export default TopMovies;
