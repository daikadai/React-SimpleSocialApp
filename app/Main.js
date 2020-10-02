import React, { useState } from "react";
import ReactDOM from "react-dom";
import About from "./components/About";
import Terms from "./components/Terms";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Axios from "axios";

Axios.defaults.baseURL = 'http://localhost:8080'

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexappToken')));

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Switch>
        <Route path="/" exact>
          { loggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/create-post" exact>
          <CreatePost />
        </Route>
        <Route path="/about-us" exact>
          <About />
        </Route>
        <Route path="/terms" exact>
          <Terms />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

ReactDOM.render(<Main />, document.querySelector("#app"));
