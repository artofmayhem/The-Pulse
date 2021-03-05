import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Deezer from "./assests/deezer.png";
import playlistCover from "./assests/playlistCover.png";

const initialState = [];
const initialSearchValue = "kaytranada";
const initialPlayList = "https://deezer.page.link/dp8EELoMmV5ZdLvA9";

function Home(props) {
  const [data, setData] = useState(initialState);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const pulsePlayList = initialPlayList;

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
            className="d-flex flex-column justify-content-center align-items-baseline "
            style={{ backgroundColor: "#222", opacity: 0.8 }}
          >
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
            <div
              className="d-flex flex-column justify-content-center"
              style={{
                alignSelf: "center",
                marginBottom: "3rem",
                backgroundColor: "#AAA",
                padding: "2rem 2.75rem",
              }}
            >
              <label htmlFor="playlist" style={{ marginTop: "3rem" }}>
                <h5 className="text-primary">
                  {" "}
                  Check out Our Pulse Playlist of The Week
                </h5>
              </label>
              <button
                name="playlist"
                className="btn btn-dark"
                style={{ alignSelf: "center", marginBottom: "2rem" }}
              >
                <a href={pulsePlayList}>Take Me There</a>
              </button>
              <a href={pulsePlayList}>
                <img
                  src={playlistCover}
                  alt="playlist cover"
                  style={{ maxWidth: "10rem" }}
                />{" "}
              </a>
            </div>
          </div>{" "}
        </form>
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
                  <img
                    style={{
                      maxWidth: "10vw",
                      alignSelf: "center",
                      marginTop: "1.5rem",
                    }}
                    src={data[idx].artist.picture_small}
                    alt={data[idx].artist.name}
                  />
                  <h2 style={{ margin: "1rem 0" }}>{data[idx].artist.name}</h2>
                </div>
                <img
                  src={data[idx].album.cover_big}
                  alt={data[idx].album.title}
                  style={{
                    margin: ".5rem .5rem",
                    maxWidth: "70vw",
                    boxShadow: "0 0 .5rem black",
                  }}
                />
                <h4
                  style={{
                    margin: "1.5rem auto",
                    textShadow: ".5rem .5rem .5rem black",
                  }}
                >
                  {data[idx].title_short}
                </h4>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function Spotlight(props) {
  const initialSpotlightValue = "yaeji";

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
      style={{ textAlign: "center" }}
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
          maxWidth: "50vw",
          alignSelf: "center",
          marginTop: "5rem",
        }}
      >
        <div
          className="d-flex flex-column justify-content-center"
          style={{
            maxWidth: "70vh",
            margin: "3rem auto",
            backgroundColor: "white",
          }}
        >
          {" "}
          <a href={data.link}>
            <h1 style={{ margin: "1rem 0" }}>{data.name}</h1>
          </a>
          <a href={data.link}>
            <img
              src={data.picture_big}
              alt={data.name}
              style={{ boxShadow: "0 0 1.5rem black", maxWidth: '150%' }}
            ></img>
          </a>{" "}
          <div className="d-flex justify-content-center" style={{margin: '1rem 0'}}>
            <h6 style={{ color: "black" }}>
              Number of Albums: {data.nb_album}
            </h6>
            <h6 style={{ color: "black", margin: '0 2vw' }}>Fans: {data.nb_fan}</h6>
          </div>
        </div>
        <div>
          <p style={{ textAlign: "justify", padding: "3rem 3rem", fontSize: '1.2rem' }}>
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
          className="btn btn-dark"
          href={data.link}
          style={{ textDecoration: "none", marginBottom: '3rem' }}
        >
          <h5>Listen to {data.name} on Deezer</h5>
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
              style={{ color: "#CCC" }}
            >
              Artists
            </Link>
            <Link
              to="spotlight"
              className=" btn btn-outline-dark"
              style={{ color: "#CCC" }}
            >
              Spotlight
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Spotlight" component={Spotlight} />
        </Switch>
      </BrowserRouter>
      {/*Why would we want code outside of browser router */}
      <footer style={{ color: "#AAA", marginTop: "5rem" }}>
        copyright 2020 Tony Miller
      </footer>
      {/*something that doesn't need to be dependent on router functions?  */}
    </div>
  );
}
