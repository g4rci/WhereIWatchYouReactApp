import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card'
import Carousel from '../../components/Carousel/Carousel'
import './TopMovies.css'
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ComedyMovies from "../MovieLists/Comedy";
import ActionMovies from "../MovieLists/Action";
import ScyFyMovies from "../MovieLists/ScyFy";
import AnimationMovies from "../MovieLists/Animation";
import CrimeMovies from "../MovieLists/Crime";
import TerrorMovies from "../MovieLists/Terror";
import MusicMovies from "../MovieLists/Music";
import ScrollContainer from 'react-indiana-drag-scroll'


function TopMovies(props) {
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
      <div className='sections' key="ok">
        <Carousel />
        <div key="ok">
        <div className='title'>
        <h5 className='bg-dark' variant='dark'>Top 20</h5>
        </div>
      <ScrollContainer id="_container">
        <div id="_container">
      {listOfMovies.map((movie) => {
        return (
        <div key={props.key} className='_cardList'>
        <div className='_cards'>
        <Card style={{ heigth: '100%' }}>
        <Link to={`/moviedetails/${movie.id}`} className="card_link">
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500//${movie.poster_path}`} />
        </Link>
        </Card>
        </div>
        </div>
        );
      })}
        </div>
    </ScrollContainer>
        </div>
        <ActionMovies />
        <ComedyMovies />
        <ScyFyMovies />
        <AnimationMovies />
        <CrimeMovies />
        <TerrorMovies />
        <MusicMovies />
        <Footer />
    </div>
  );
}

export default TopMovies;
