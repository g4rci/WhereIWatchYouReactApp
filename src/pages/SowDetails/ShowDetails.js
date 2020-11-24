import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import './../MovieDetails/MovieDetails.css'


function ShowDetails(props) {
  const [showDetails, setShowDetails] = useState([]);
  const [showTrailer, setShowTrailer] = useState([]);
  const [showVod, setShowVod] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [lastEpisode, setLastEpisode] = useState([]);

  const getShow =  () => {
     axios
    .get(
      `https://api.themoviedb.org/3/tv/${props.match.params.id}?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es`
      )
      .then((responseFromApi) => {
          console.log(responseFromApi.data)
        setShowDetails(responseFromApi.data);
        setGenreList(responseFromApi.data.genres)
        setLastEpisode(responseFromApi.data.last_episode_to_air)
      })
    };
    
    useEffect(function () {
      getShow();
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const getTrailer =  () => {
     axios
     .get(
       `https://api.themoviedb.org/3/tv/${props.match.params.id}/videos?api_key=${process.env.REACT_APP_THEMOVIEDB}`
       )
       .then((videoResponse) => {
          setShowTrailer(videoResponse.data.results[0] ?
            videoResponse.data.results[0].key :
            null
            )
       })
     }       
  
    useEffect(function () {
      getTrailer();
          //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getVod = () => {
      axios({
        "method":"GET",
        "url":"https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key":process.env.REACT_APP_utellyApiKey,
        "useQueryString":true
        },"params":{
        "country":"es",
        "source_id":`${props.match.params.id}`,
        "source":"tmdb"
        }
        })
    .then((Response) => {
      setShowVod(
        Response.data.collection.locations ? 
        Response.data.collection.locations : 
        []
        )
      // var services = Response.data.collection.locations.filter(x => {
      //   return x.country[0] === 'es'
      // })
      //   setMovieVod(services)
    })}
  

    useEffect(function () {
        getVod();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div className='info sections'>
      <Card style={{ width: "100vw" }}>
        <Card.Img className='backdrop' variant="top" src={`https://image.tmdb.org/t/p/w500//${showDetails.backdrop_path}`} />
        <Card.Body>
      {showDetails ?
      <img className='background'
        src={`https://image.tmdb.org/t/p/w500//${showDetails.poster_path}`}
        alt={showDetails.poster_path}
        /> : 
        null}
          <Card.Title>{showDetails.title}</Card.Title>
          <Card.Text>{showDetails.overview}</Card.Text>
      {showVod.map((vod) => {
        return (
          <ListGroup key={vod.name} className="list-group-flush">
          <a href={vod.url}>  
            <Card.Text>{vod.display_name}: <img src={vod.icon} alt={vod.display_name}></img></Card.Text>
          </a>
          </ListGroup>
        )
      })}
          
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Original title: {showDetails.original_name}</ListGroupItem>
          <ListGroupItem>
            <p>Genres: </p>
            {genreList.map((g) => {
                return (
                  <ul key={g.name}>
                    <li>{g.name}</li>
                  </ul> 
                  )
                })}
          </ListGroupItem>
          <ListGroupItem>
            First Air Date: {showDetails.first_air_date} <br></br>
            Last Air Date: {showDetails.last_air_date} <br></br>
            Last Episode To Air: 
                <ul>
                    <ol>Title: {lastEpisode.name}</ol>
                    <ol>Season: {lastEpisode.season_number}</ol>
                    <ol>Episode: {lastEpisode.episode_number}</ol>
                    <ol>Overview: {lastEpisode.overview}</ol>
                </ul>
                
          </ListGroupItem>
          <ListGroupItem>Calification: {showDetails.vote_average} ★</ListGroupItem>
          
        </ListGroup>
        <Card.Body>
          <Card.Link href={showDetails.homepage}>Oficial WebPage</Card.Link>
          <Card.Link href={`https://www.imdb.com/title/${showDetails.imdb_id}/?ref_=fn_al_tt_1`}>Imdb Link</Card.Link>
          {showTrailer ? 
         <ReactPlayer className='trailer' url={`https://www.youtube.com/watch?v=${showTrailer}`} playing controls volume={0.5} light width={'100%'} height={'30rem'}/> :
         <div className='trailer'></div>}
        </Card.Body>
      </Card>
      {/* <Footer /> */}
    </div>
  );
}

export default ShowDetails;

