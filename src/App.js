import React, { useState, useReducer } from "react";
import axios from "axios";
import "./assets/style/header.css";
import "./assets/style/userinfo.css";
import "./assets/style/card.css";
import "./App.css";

const initState = {
  data: {},
  name: "",
  loading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "success":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "error":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

function Card(props) {
  return (
    <div className="card">
      <h2>{props.count}</h2>
      <h3>{props.name}</h3>
    </div>
  )
}

export default function App() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, initState);

  async function handleClick(e) {
    e.preventDefault();
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.get(`https://fortnite-api.p.rapidapi.com/stats/${name}`, {
        headers: {
          "x-rapidapi-host": "fortnite-api.p.rapidapi.com",
          "x-rapidapi-key": "5a0bae066cmsh936eabf8958a7d4p10e690jsn3c51ecb2bce6",
        },
      });
      dispatch({ type: "success", payload: data });
    } catch (error) {
      let errMsg = "We found an error here 😥";
      dispatch({ type: "error", error: errMsg });
    }
  }

  return (
    <main className="App">
      <header>
        <nav>
          <img src="https://pasteboard.co/JTY5O4N.png" alt="logo" id="logo" />
          <div>
            <a href="https://www.instagram.com/alaahijazi.7/" target="_blank" rel="noreferrer">
              <img src="https://ibb.co/xzHZs54" alt="instagram logo" id="instagram-logo" />
            </a>
            <a href="https://github.com/Alaa-Hijazi7" target="_blank" rel="noreferrer">
              <img src="https://ibb.co/Y0Gk7Bp" alt="github logo" id="github-logo" />
            </a>
          </div>
        </nav>
        <form onSubmit={handleClick}>
          <input type="text" placeholder="search with username" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="submit" onClick={handleClick} />
        </form>
      </header>
      {state.loading && <div id="circle"></div>}
      {state.data.season && !state.loading && <React.Fragment>
        <section id="user-info">
          <img src="https://i.pinimg.com/564x/98/a8/a3/98a8a3155d35787032a5105084e95832.jpg" alt="user avatar" />
          <div>
            <h3 id="username">Display name: <span>{state.data.user?.displayName}</span></h3>
            <h4 id="platform">Platform: <span>{ state.data.user?.externalAuths?.psn?.type || "PC" }</span></h4>
          </div>
        </section>
        <section id="cards">
          <Card name="Score" count={state.data.season.all.all.score === 0 ? "0" : state.data.season.all.all.score || "not sure"} />
          <Card name="Kills" count={state.data.season.all.all.kills === 0 ? "0" : state.data.season.all.all.kills || "not sure"} />
          <Card name="KDr" count={state.data.season.all.all.kdr === 0 ? "0" : state.data.season.all.all.kdr || "not sure"} />
          <Card name="Matches Played" count={state.data.season.all.all.matchesplayed === 0 ? "0" : state.data.season.all.all.matchesplayed || "not sure"} />
          <Card name="Place Top 1" count={state.data.season.all.all.placetop1 === 0 ? "0" : state.data.season.all.all.placetop1 || "not sure"} />
          <Card name="Place Top 10" count={state.data.season.all.all.placetop10 === 0 ? "0" : state.data.season.all.all.placetop10 || "not sure"} />
          <Card name="Place Top 25" count={state.data.season.all.all.placetop25 === 0 ? "0" : state.data.season.all.all.placetop25 || "not sure"} />
        </section>
      </React.Fragment>}
      {<h1 id="errorMsg">{state.data?.error}</h1>}
    </main>
  );
}
