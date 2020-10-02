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
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMessages from "./components/FlashMessages";

Axios.defaults.baseURL = 'http://localhost:8080'

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexappToken')));
  const [flashMessages, setFlashMessages] = useState([]);

  function addFlashMessage(msg) {
    setFlashMessages(prev => prev.concat(msg))
  }

  return (
    <BrowserRouter>
      <FlashMessages messages={flashMessages}/>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Switch>
        <Route path="/" exact>
          { loggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/post/:id">
          <ViewSinglePost />
        </Route>
        <Route path="/create-post" exact>
          <CreatePost addFlashMessage={addFlashMessage}/>
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
