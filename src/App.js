import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";

const initialState = [];
const initialSearchValue = "";

function Home(props) {
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const [data, setData] = useState(initialState);
  const baseUri = "https://spoonacular.com/recipeImages/";

  const options = {
    method: "GET",
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
    params: { query: searchValue },
    headers: {
      "x-rapidapi-key": "b461d692bemshe80b4354ca6ba03p184f2ejsn08a3bb994638",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        console.log(
          "This API Request was successful. Data Resolved",
          res.data.results
        );
        setData(res.data.results);
      })
      .catch((error) => {
        console.log("This API request failed", error);
      });
  }, [searchValue]);

  return (
    <div
      className="d-flex justify-content-center flex-column"
      style={{ marginTop: "2rem", textAlign: "center" }}
    >
      <div>
        <h2 style={{ alignSelf: "center", marginTop: '3rem' }}>
          Find A new Recipe in our Recipe Database
        </h2>
      </div>
      <div>
        <label htmlFor="searchBar" style={{ color: "black" }}>
          Search:{" "}
        </label>
        <input
          name="searchBar"
          type="text"
          placeholder="Input any location value"
          style={{
            width: "20rem",
            alignSelf: "center",
            backgroundColor: "#444",
            color: "lightblue",
            textAlign: "center",
            fontSize: "1.25rem",
            margin: "3rem",
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="d-flex flex-wrap justify-content-center">
          {data.map((item, idx) => {
            return (
              <div
                className="d-flex cards flex-column container justify-content-center align-items-lg-center"
                key={idx}
                style={{
                  width: "30%",
                  margin: "3rem 2rem",
                  border: "2px solid black",
                  textAlign: "center",
                }}
              >
                {" "}
                <h3 style={{ padding: "3rem 0" }}>
                  <a href={data[idx].sourceUrl} style={{ color: "white" }}>
                    {data[idx].title}
                  </a>
                </h3>
                <a href={data.[idx].sourceUrl}>
                  <img
                    src={baseUri + data[idx].image}
                    alt={data[idx].title}
                    style={{ maxWidth: "80%", minWidth: '80%', marginBottom: "3rem" }}
                  />
                 
                </a>
                <h5>Ready in: {data[idx].readyInMinutes} mins</h5>
                <h5>Serves: {data[idx].servings}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function About(props) {
  return (
    <div
      className="d-flex justify-content-center flex-column"
      style={{ marginTop: "2rem", textAlign: "center" }}
    >
      <div>
        <h1>Take Flight</h1>
      </div>
      <div>
        <h3>strap in and prepare for take off... </h3>
      </div>
      <div>
        <img
          src="https://assets.codepen.io/4996277/airport.jpg"
          className="sizer"
          alt="another"
          style={{ margin: "5rem" }}
        />
      </div>
    </div>
  );
}
function Location(props) {
  return (
    <div
      className="d-flex justify-content-center flex-column"
      style={{ marginTop: "2rem", textAlign: "center" }}
    >
      <div>
        <h1 style={{ textAlign: "center" }}>Hawaii</h1>
      </div>
      <div>
        <h3 style={{ textAlign: "center" }}>
          Sit back and enjoy the ocean breeze
        </h3>
      </div>
      <div>
        <img
          src="https://assets.codepen.io/4996277/pexels-quang-nguyen-vinh-4078031.jpg"
          className="sizer"
          alt="this"
          style={{ margin: "5rem" }}
        />
      </div>
    </div>
  );
}
function JukeJoint(props) {
  return (
    <div
      className="d-flex justify-content-center flex-column"
      style={{ marginTop: "2rem", textAlign: "center" }}
    >
      <h1 style={{ textAlign: "center" }}>Mai Tai By the Beach</h1>
      <h3 style={{ textAlign: "center" }}>Sip the flavors of the isles...</h3>
      <img
        src="https://assets.codepen.io/4996277/pexels-surawitch-atsaradorn-1368042.jpg"
        className="sizer"
        alt="one"
        style={{ margin: "5rem auto" }}
      />
    </div>
  );
}

export default function App() {
  return (
    <div className=" parallax-bg jumbotron">
      <BrowserRouter>
        <div className="container">
          <div className="d-flex bg-light header flex-column justify-content-center">
            <h1 style={{fontSize: '20vh'}}>GrubSpace</h1>
            <h5>Your quick & easy source of 5000+ recipes</h5>
          </div>
          <div className="d-flex flex-row-wrap justify-content-center nav">
            <Link
              to="/"
              className=" btn btn-one"
              style={{color: '#CCC' }}
            >
              Foodstuffs
            </Link>
            <Link
              to="about"
              className="btn btn-one"
              style={{ color: "#CCC" }}
            >
              Libations
            </Link>
            <Link
              to="location"
              className="btn btn-one"
              style={{ color: "#CCC" }}
            >
              Master Class
            </Link>
            <Link
              to="jukejoint"
              className="btn btn-one"
              style={{ color: "#CCC" }}
            >
              TBD
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/Location" component={Location} />
          <Route path="/JukeJoint" component={JukeJoint} />
        </Switch>
      </BrowserRouter>
      {/*Why would we want code outside of browser router */}
      <footer>copyright 2020 Tony Miller</footer>
      {/*something that doesn't need to be dependent on router functions?  */}
    </div>
  );
}
