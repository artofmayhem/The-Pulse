import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Deezer from "./assests/deezer.png";
import playlistDay from "./assests/playlistDay.jpeg";
import playlistWeek from "./assests/playlistWeek.jpeg";
import spotlight from "./assests/spotlight.jpg";

const initialState = [];
const initialSearchValue = "";
const initialPlayList = "https://deezer.page.link/2qKyiqSy2tV9cD5E7";

function Home(props) {
  const [data, setData] = useState(initialState);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const pulseWeeklyPlayList = initialPlayList;
  const pulseDailyPlayList = "https://www.deezer.com/us/playlist/8820898002";

  const options = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: { q: searchValue },
    headers: {
      "x-rapidapi-key": "cc687eba84mshcc7485fcf110baap193a15jsnfb1be463a74d",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [searchValue]);

  const handleClick = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  console.log(data);
  return (
    <div
      className="d-flex justify-content-center flex-row flex-wrap"
      style={{ marginTop: "2rem", textAlign: "center" }}
    >
      <div className="container d-flex flex-column justify-content-center align-content-baseline">
        <form onSubmit={handleClick}>
          {" "}
          <div
            className="d-flex flex-row flex-wrap justify-content-around align-items-baseline "
            style={{ backgroundColor: "#222", opacity: 0.8 }}
          >
            <div
              className="d-flex flex-column justify-content-center"
              style={{
                alignSelf: "center",
                margin: "3rem 0",
                backgroundColor: "#AAA",
                minWidth: "40%",
              }}
            >
              <a href={pulseWeeklyPlayList} style={{ textDecoration: "none" }}>
                <img
                  name="playlist"
                  src={playlistWeek}
                  alt="playlist cover"
                  style={{
                    maxWidth: "18rem",
                    boxShadow: "0 0 1rem #222",
                    alignSelf: "center",
                    marginTop: "2rem",
                  }}
                />{" "}
                <h5 className="text-light" style={{ margin: "2rem 0" }}>
                  {" "}
                  Check out Our Pulse Playlist of The Week
                </h5>
              </a>
            </div>
            <div
              className="d-flex flex-column justify-content-center"
              style={{
                alignSelf: "center",
                margin: "3rem 0",
                backgroundColor: "#AAA",
                padding: "2rem 2.75rem",
                minWidth: "40%",
              }}
            >
              <a href={pulseDailyPlayList} style={{ textDecoration: "none" }}>
                <img
                  src={playlistDay}
                  alt="playlist cover"
                  style={{
                    maxHeight: "8rem",
                    boxShadow: "0 0 1rem #222",
                    textDecoration: "none",
                    alignSelf: "center",
                  }}
                />{" "}
                <h5
                  className="text-light"
                  style={{ margin: "2rem 0", textDecoration: "none" }}
                >
                  {" "}
                  Pulse Playlist of The Day
                </h5>
              </a>
            </div>
          </div>{" "}
        </form>
        <div
          className="d-flex flex-column justify-content-center"
          style={{
            alignSelf: "center",
            marginTop: "2rem",
            backgroundColor: "#444",
            padding: "2rem 3rem",
          }}
        >
          <h5>Find Your Favorite Artist, Album, or Song</h5>
          <input
            type="text"
            value={searchValue.toUpperCase()}
            onChange={handleChange}
            style={{
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
            }}
          />
        </div>
      </div>
      <div
        className="d-flex flex-row justify-content-center container flex-wrap"
        style={{ minHeight: "40vh" }}
      >
        {data &&
          data.map((item, idx) => {
            return (
              <div
                className="card cards text-light"
                style={{
                  margin: "3rem 1rem",
                  maxWidth: "100vw",
                  boxShadow: "0 1rem 1rem #222",
                }}
                key={idx}
              >
                <div
                  className="d-flex justify-content-center flex-column"
                  style={{ backgroundColor: "#333" }}
                >
                  <a href={data[idx].artist.link}>
                    <img
                      style={{
                        maxWidth: "10vw",
                        alignSelf: "center",
                        marginTop: "1.5rem",
                      }}
                      src={data[idx].artist.picture_small}
                      alt={data[idx].artist.name}
                    />
                  </a>
                  <a
                    href={data[idx].artist.link}
                    style={{ textDecoration: "none" }}
                  >
                    <h2 style={{ margin: "1rem 0" }}>
                      {data[idx].artist.name}
                    </h2>
                  </a>
                </div>
                <a
                  href={data[idx].link}
                  style={{ margin: ".5rem .5rem", alignSelf: "center" }}
                >
                  <img
                    src={data[idx].album.cover_big}
                    alt={data[idx].album.title}
                    style={{
                      maxWidth: "70vw",
                      boxShadow: "0 0 .5rem black",
                    }}
                  />
                </a>

                <a
                  href={data[idx].link}
                  style={{
                    margin: ".5rem .5rem",
                    alignSelf: "center",
                    textDecoration: "none",
                  }}
                >
                  <h4
                    style={{
                      margin: "1.5rem auto",
                      textShadow: ".5rem .5rem .5rem black",
                    }}
                  >
                    {data[idx].title_short}
                  </h4>
                </a>
                {/* <audio
                  controls
                  preload="none"
                  style={{ width: "20rem", alignSelf: "center" }}
                >
                  <source src={data && data[idx].preview} type="audio/mpeg" />
                </audio> */}
                <br />
              </div>
            );
          })}
      </div>
    </div>
  );
}

function Spotlight(props) {
  const initialSpotlightValue = "zo";
  const pulseSpotLightPlayList = "https://www.deezer.com/us/playlist/8821019162";

  const [data, setData] = useState(initialState);
  const [spotlightValue, setSpotlightValue] = useState(initialSpotlightValue);

  const options = {
    method: "GET",
    url: `https://deezerdevs-deezer.p.rapidapi.com/artist/${initialSpotlightValue}`,
    params: { id: spotlightValue },
    headers: {
      "x-rapidapi-key": "cc687eba84mshcc7485fcf110baap193a15jsnfb1be463a74d",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [spotlightValue]);

  console.log(data);
  return (
    <div
      className="d-flex justify-content-center flex-column"
      style={{
        textAlign: "center",
        minWidth: "80vw",
        alignSelf: "center",
        marginTop: "3rem",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "5rem",
          alignSelf: "center",
          marginTop: "5rem",
        }}
      >
        Welcome to The Artist Spotlight
      </h1>{" "}
      <p>
        This is where we bring to you an artist of the week that needs to make
        their way to your playlists
      </p>
      <div
        className="d-flex justify-content-center align-content-center flex-column"
        style={{
          opacity: "0.9",
          backgroundColor: "#222",
          maxWidth: "85vw",
          alignSelf: "center",
          marginTop: "5rem",
        }}
      >
        <div
          className="d-flex flex-column justify-content-center"
          style={{
            maxWidth: "75vh",
            margin: "3rem auto",
            backgroundColor: "white",
            padding: "0 1rem",
          }}
        >
          {" "}
          <a href={data.link} style={{ textDecoration: "none" }}>
            <h1 style={{ margin: "1rem 0" }}>{data.name}!</h1>
          </a>
          <a href={data.link}>
            <img
              src={data.picture_big}
              alt={data.name}
              style={{ boxShadow: "0 0 1.5rem black", maxWidth: "70vw" }}
            ></img>
          </a>{" "}
          <div
            className="d-flex justify-content-center"
            style={{ margin: "1rem 0" }}
          >
            <h6 style={{ color: "black" }}>
              Number of Albums: {data.nb_album}
            </h6>
            <h6 style={{ color: "black", margin: "0 2vw" }}>
              Fans: {data.nb_fan}
            </h6>
          </div>
        </div>
        <div style={{ padding: "1rem", maxWidth: "75vw", alignSelf: "center" }}>
          <p
            style={{
              textAlign: "justify",
              padding: "3rem 1rem",
              fontSize: "1.2rem",
            }}
          >
            Multi-Instrumentalist/Producer Zo! is Detroit-area born and raised,
            Silver Spring, MD based… Lorenzo Ferguson.
            <br />
            <br />
            Influenced by a wide range of music genres introduced to him at an
            early age, Zo! utilizes multiple layers of thick instrumentation to
            shape his compositions, as demonstrated on his solo albums. While
            touring his own material regularly, Zo! can also be seen on stage as
            the keyboardist and Musical Director for GRAMMY-nominated duo, The
            Foreign Exchange. In 2014, he completed music work for the Adult
            Swim animated series, Black Dynamite. Zo! co-produced The Foreign
            Exchange’s 2015 release, Tales From The Land Of Milk and Honey. His
            SkyBreak album was released in 2016 along with its accompanying
            behind-the-scenes, two-time award-winning documentary, Making
            SkyBreak (2017). Zo! then began expanding his musical repertoire to
            include film scoring, completing full scores for two documentaries:
            Black, White & Blue (2018) and the Northwestern University
            commissioned, The Takeover (2018). Along with production partner,
            Phonte (of The Foreign Exchange) Zo! helped to compose music for the
            IFC sketch-comedy series, Sherman’s Showcase (2019). In August of
            2019, Zo! released FourFront his fourth compilation-style album on
            the +FE Music imprint. He continues to emphasize the usage of live
            instrumentation and raw emotion as the blueprint for his music while
            continuing to expand his sound with each album release.
          </p>
        </div>
        <a
          href={pulseSpotLightPlayList}
          style={{ textDecoration: "none", marginBottom: "3rem" }}
        >
          <img
            src={spotlight}
            alt="artist spotlight playlist"
            style={{
              maxWidth: "35vw",
              boxShadow: "0 0 1rem #222",
              textDecoration: "none",
              alignSelf: "center",
            }}
          />
          <h6 style={{ marginTop: "2rem", padding: "0 2rem" }}>
            Listen to the Artist Spotlight Playlist on Deezer
          </h6>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className=" parallax-bg jumbotron" style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <div className="container">
          <div
            className="d-flex bg-light header flex-column justify-content-center"
            style={{ textAlign: "center" }}
          >
            <h1 style={{ fontSize: "20vh" }}>The Pulse</h1>
            <h5>powered by deezer</h5>
            <img src={Deezer} alt="deezer" style={{ maxWidth: "5vw" }} />
          </div>
          <div className="d-flex flex-row-wrap justify-content-center nav">
            <Link
              to="/"
              className=" btn btn-outline-dark"
              style={{ color: "#CCC", margin: "1.5rem 2rem" }}
            >
              Artists
            </Link>
            <Link
              to="spotlight"
              className=" btn btn-outline-dark"
              style={{ color: "#CCC", margin: "1.5rem 2rem" }}
            >
              Spotlight
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Spotlight" component={Spotlight} />
        </Switch>
      </BrowserRouter>
      {/*Why would we want code outside of browser router */}
      <footer style={{ color: "#AAA", marginTop: "5rem", textAlign: "center" }}>
        <h6>copyright 2020 Tony Miller</h6>
      </footer>
      {/*something that doesn't need to be dependent on router functions?  */}
    </div>
  );
}
