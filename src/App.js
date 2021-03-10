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
  const pulseDailyPlayList = "https://deezer.page.link/VRxWm8SovHJ2sHU49";
  

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
                    alignSelf: 'center',
                    marginTop: '2rem'
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
                    alignSelf: 'center'
                  }}
                />{" "}
                <h5
                  className="text-light"
                  style={{ margin: "2rem 0", textDecoration: "none" }}
                >
                  {" "}
                  Pulse Playlist of The Day 3.6.21
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
                  <a href={data[idx].artist.link}>
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
                  style={{ margin: ".5rem .5rem", alignSelf: "center", textDecoration: 'none' }}
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
  const initialSpotlightValue = "yaeji";
  const pulseSpotLightPlayList = 'https://deezer.page.link/6X7yASvxDUVgFmws5';

  const [data, setData] = useState(initialState);
  const [spotlightValue, setSpotlightValue] = useState(initialSpotlightValue);

  const options = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/artist/yaeji",
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
      style={{ textAlign: "center", minWidth: '80vw', alignSelf: 'center', marginTop: '3rem' }}
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
            padding: '0 1rem'
          }}
        >
          {" "}
          <a href={data.link} style={{textDecoration: 'none'}}>
            <h1 style={{ margin: "1rem 0" }}>{data.name}</h1>
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
        <div style={{padding: '1rem', maxWidth: '75vw', alignSelf: 'center'}}>
          <p
            style={{
              textAlign: "justify",
              padding: "3rem 1rem",
              fontSize: "1.2rem",
            }}
          >
            Kathy Yaeji Lee was born August 6, 1993 in Flushing, Queens as a
            single child in a Korean family. Growing up, Yaeji moved from New
            York to Atlanta when she was 5, and then to South Korea in the third
            grade. While living in South Korea, Yaeji switched between different
            international schools on a yearly basis, causing her to find friends
            on the Internet, where she would first discover music. Yaeji also
            briefly attended school in Japan before moving back to Korea.
            <br></br>
            <br></br>
            Yaeji eventually moved back to the United States to study conceptual
            art, East Asian studies and graphic design at Carnegie Mellon
            University in Pittsburgh. Yaeji embraced DJing as a hobby while
            attending Carnegie Mellon, after learning how to use Traktor and
            beginning to DJ at house parties. She DJed for two years before
            learning Ableton, making her own music and debuting on Carnegie
            Mellon's college radio station. Yaeji graduated from Carnegie Mellon
            in 2015.
            <br></br>
            <br></br>
            After graduation, Yaeji moved back to New York City to get involved
            in the music scene and DJ.Her first single, "New York '93",
            referring to her year of birth, was issued on the New York City
            label Godmode on February 29, 2016, followed by a cover of "Guap" by
            Australian DJ Mall Grab that May. She had previously uploaded songs
            to SoundCloud, although they were removed; this included
            "Areyouami", which was released when she was at college.
            <br></br>
            <br />
            Her debut eponymous EP, including both prior singles, was released
            by Godmode on March 31, 2017. She began to gain attention following
            her first Boiler Room session in May 2017, which involved a remix of
            Drake's single "Passionfruit". The song was later released
            officially on Godmode's Soundcloud page. The first of several
            stand-alone singles, "Therapy" was issued in July 2017, followed by
            a two-track digital single, Remixes, Vol. 1, on August 1 and the
            "Last Breath" single on August 28.
            <br />
            <br />
            The music video for the single "Drink I'm Sippin On" was released on
            88rising's YouTube channel in October 2017, quickly gaining over a
            million views in two weeks. On November 3, 2017, Yaeji released her
            second EP, EP2, to positive reviews and moderate commercial success.
            The video for "Raingurl" was released on November 16. She was named
            to the BBC's Sound of 2018 longlist in November 2017.
            <br />
            <br />
            Yaeji performed at the 2018 Coachella Festival. She did a virtual
            Boiler Room set to raise funds for The Bail Project on August 28,
            2020.
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
              alignSelf: 'center'
            }}
          />
          <h6 style={{marginTop: '2rem', padding: '0 2rem'}}>Listen to the Artist Spotlight Playlist on Deezer</h6>
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
              style={{ color: "#CCC", margin: '1.5rem 2rem' }}
            >
              Artists
            </Link>
            <Link
              to="spotlight"
              className=" btn btn-outline-dark"
              style={{ color: "#CCC", margin: '1.5rem 2rem' }}
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
      <footer style={{ color: "#AAA", marginTop: "5rem", textAlign: 'center' }}>
        <h6>copyright 2020 Tony Miller</h6>
      </footer>
      {/*something that doesn't need to be dependent on router functions?  */}
    </div>
  );
}
