import React, { useEffect, useReducer } from "react";
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
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import { useImmerReducer } from "use-immer";
import Profile from "./components/Profile";

Axios.defaults.baseURL = "http://localhost:8080";

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem('complexappToken'),
      username: localStorage.getItem('complexappUsername'),
      avatar: localStorage.getItem('complexappAvatar')
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data
        return 
      case "logout":
        draft.loggedIn = false;
        return 
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if(state.loggedIn) {
      localStorage.setItem('complexappToken', state.user.token);
      localStorage.setItem('complexappUsername', state.user.username);
      localStorage.setItem('complexappAvatar', state.user.avatar);
    } else {
      localStorage.removeItem('complexappToken');
      localStorage.removeItem('complexappUsername');
      localStorage.removeItem('complexappAvatar');
    }

  },[state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header/>
          <Switch>
            <Route path="/profile/:username">
              <Profile />
            </Route>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/post/:id">
              <ViewSinglePost />
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
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.querySelector("#app"));
