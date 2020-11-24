import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";

function TerrorShows(props) {
  const [listOfShows, setListOfShows] = useState([]);
  const getTerrorShows = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_THEMOVIEDB}&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27`
      )
      .then((responseFromApi) => {
        setListOfShows(responseFromApi.data.results);
      });
  };
  useEffect(function () {
    getTerrorShows();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key="terror">
      <div className="title">
        <h5 className="bg-dark" variant="dark">
          Terror
        </h5>
      </div>
      <ScrollContainer>
        <div id="_container">
          {listOfShows.map((show) => {
            return (
              <div key={show.id} className="_cardList">
                <div className="_cards">
                  <Card style={{ heigth: "100%" }}>
                    <Link
                      to={`/showdetails/${show.id}`}
                      className="card_link"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                    {show.poster_path ?
                    <div>
                        <Card.Img
                            variant="top"
                            src={ 
                            `https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                        />
                    </div>
                       :
                    <div style={{height: '100%'}}>
                        <p className='showTtitle'>{show.name}</p>
                        <Card.Img 
                            variant="top"
                            src={ 
                            `https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg`}
                        />
                    </div>
                      }
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

export default TerrorShows;
