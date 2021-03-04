import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";

const initialState = [];
const initialSearchValue = "LaHavas";

function Home(props) {
  const [data, setData] = useState(initialState);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

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
      <div className="container" >
        <input type="text" value={searchValue} onChange={handleChange} style={{backgroundColor: 'black', color: 'white', textAlign: 'center'}}/>
      </div>
      <div className="d-flex flex-row justify-content-center flex-wrap">
        {data &&
          data.map((item, idx) => {
            return (
              <div
                className="card cards text-light"
                style={{ margin: "3rem 1rem" }}
                key={idx}
              >
                <div className='d-flex justify-content-center flex-column' style={{backgroundColor: '#333'}}>
                <img
                  style={{ maxWidth: "5vw", alignSelf: 'center', marginTop: '1.5rem' }}
                  src={data[idx].artist.picture_small}
                  alt={data[idx].artist.name}
                />
                <h2 style={{ margin: "1rem 0" }}>{data[idx].artist.name}</h2>
               </div>
                <img
                  src={data[idx].album.cover_big}
                  alt={data[idx].album.title}
                  style={{ margin: ".5rem .5rem" }}
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
    <div className=" parallax-bg jumbotron">
      <BrowserRouter>
        <div className="container">
          <div className="d-flex bg-light header flex-column justify-content-center">
            <h1 style={{ fontSize: "20vh" }}>The Pulse</h1>
            <h5>powered by deezer</h5>
          </div>
          <div className="d-flex flex-row-wrap justify-content-center nav">
            <Link to="/" className=" btn btn-one" style={{ color: "#CCC" }}>
              Artists
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
      {/*Why would we want code outside of browser router */}
      <footer>copyright 2020 Tony Miller</footer>
      {/*something that doesn't need to be dependent on router functions?  */}
    </div>
  );
}
