import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Deezer from "./assests/deezer.png";

const initialState = [];
const initialSearchValue = "";
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
            className="d-flex flex-row justify-content-around align-items-baseline "
            style={{ backgroundColor: "#222", opacity: 0.8 }}
          >
            <div>
            <h5 >
              Find Your Favorite Artist, Album, or Song
            </h5>
            <input
              type="text"
              value={searchValue}
              onChange={handleChange}
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
              }}
            /></div>
            <div className='d-flex flex-column'>
            <label
              htmlFor="playlist"
              style={{ marginTop: "3rem", color: "#CCC" }}
            >
              <h5> Check out Our Pulse Playlist of The Week</h5>
            </label>
            <button
              name="playlist"
              className="btn btn-outline-dark"
              style={{ alignSelf: "center", marginBottom: '2rem' }}
            >
              <a href={pulsePlayList}>Take Me There</a>
            </button></div>
          </div>{" "}
        </form>
      </div>
      <div className="d-flex flex-row justify-content-center container flex-wrap" style={{minHeight: '40vh'}}>
        {data &&
          data.map((item, idx) => {
            return (
              <div
                className="card cards text-light"
                style={{ margin: "3rem 1rem", maxWidth: "100vw" }}
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
                  style={{ margin: ".5rem .5rem", maxWidth: "70vw" }}
                />
                <h4 style={{ margin: "1.5rem auto" }}>
                  {data[idx].title_short}
                </h4>
              </div>
            );
          })}
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
            <Link to="/" className=" btn btn-outline-dark" style={{ color: "#CCC" }}>
              Artists
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
      {/*Why would we want code outside of browser router */}
      <footer style={{color: '#AAA', marginTop: '5rem'}}>copyright 2020 Tony Miller</footer>
      {/*something that doesn't need to be dependent on router functions?  */}
    </div>
  );
}
