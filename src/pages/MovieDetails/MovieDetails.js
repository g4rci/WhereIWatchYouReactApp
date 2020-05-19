import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import './MovieDetails.css'
import Footer from "../../components/Footer/Footer";


  function MovieDetails(props) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [movieVod, setMovieVod] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const getMovie =  () => {
     axios
    .get(
      `https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es`
      )
      .then((responseFromApi) => {
        setMovieDetails(responseFromApi.data);
        setGenreList(responseFromApi.data.genres)
      })
    };
    
    useEffect(function () {
      getMovie();
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const getTrailer =  () => {
     axios
     .get(
       `https://api.themoviedb.org/3/movie/${movieDetails.id}/videos?api_key=${process.env.REACT_APP_THEMOVIEDB}`
       )
       .then((videoResponse) => {
         let trailer = videoResponse.data.results
         if (trailer.length > 0){
          setMovieTrailer(videoResponse.data.results[0].key)
         }else {
         setMovieTrailer(null)
         }
       })
     }       
  
    useEffect(function () {
      getTrailer();
          //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieDetails]);

    const getVod = () => {
      axios
      .get(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?country=es&source_id=${movieDetails.id}&source=tmdb`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "dee1be226amshd4f1007ee0cfd66p16133djsnb064774f81c4"
        }
    })
    .then((Response) => {
      setMovieVod(Response.data.collection.locations)
    })}
  
    useEffect(function() {
        getVod();
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieDetails])

    
    return (
      <div className='info'>
      <Card style={{ width: "100vw" }}>
        <Card.Img className='backdrop' variant="top" src={`https://image.tmdb.org/t/p/w500//${movieDetails.backdrop_path}`} />
        <Card.Body>
      <img className='background'
        src={`https://image.tmdb.org/t/p/w500//${movieDetails.poster_path}`}
        alt=""
        />
          <Card.Title>{movieDetails.title}</Card.Title>
          <Card.Text>{movieDetails.overview}
      {movieVod.map((vod) => {
        return (
          <div>
          <ListGroup className="list-group-flush">
          <a href={vod.url}>  
          <Card.Text>{vod.display_name}: <img src={vod.icon} alt=""></img></Card.Text>
          </a>
          </ListGroup>
          </div>
        )
      })}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Original title: {movieDetails.original_title}</ListGroupItem>
          <ListGroupItem>
            <p>Genres: </p>
            {genreList.map((g) => {
                return (
                  <ul>
                    <li>{g.name}</li>
                  </ul> 
                  )
                })}
          </ListGroupItem>
          <ListGroupItem>Release Date: {movieDetails.release_date}</ListGroupItem>
          <ListGroupItem>Calification: {movieDetails.vote_average} ★</ListGroupItem>
          
        </ListGroup>
        <Card.Body>
          <Card.Link href={movieDetails.homepage}>Oficial WebPage</Card.Link>
          <Card.Link href={`https://www.imdb.com/title/${movieDetails.imdb_id}/?ref_=fn_al_tt_1`}>Imdb Link</Card.Link>
         <ReactPlayer className='trailer' url={`https://www.youtube.com/watch?v=${movieTrailer}`} playing controls volume={0.5} light width={'100%'} height={'30rem'}/>
        </Card.Body>
      </Card>
      <Footer />
    </div>
  );
}

export default MovieDetails;
