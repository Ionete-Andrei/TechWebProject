import React, { Profiler } from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./pages/User";
import Group from "./pages/Group";
import Food from "./pages/Food";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import FriendProfile from "./pages/FriendProfile";

export default function Layout() {
  const loggedInLinks = [
    {
      href: "/profile",
      name: "Home",
    },
    {
      href: "/",
      name: "Logout",
    },
    {
      href: "/friends",
      name: "Friends",
    },
  ];

  return (
    <Router>
      <Switch>
        {/* The landing page route with the default navbar in place */}
        <Route exact path="/">
          <header>
            <Navbar></Navbar>
          </header>
          <main>
            <Home />
          </main>
        </Route>

        <Route exact path="/login">
          <header>
            <Navbar></Navbar>
          </header>
          <main>
            <Login />
          </main>
        </Route>

        <Route exact path="/register">
          <header>
            <Navbar></Navbar>
          </header>
          <main>
            <Register />
          </main>
        </Route>

        <Route exact path="/profile">
          <header>
            <Navbar links={loggedInLinks}></Navbar>
          </header>
          <main>
            <Profile></Profile>
          </main>
        </Route>

        <Route exact path="/friends">
          <header>
            <Navbar links={loggedInLinks}></Navbar>
          </header>
          <main>
            <Friends></Friends>
          </main>
        </Route>

        <Route exact path="/profile/friend">
          <header>
            <Navbar links={loggedInLinks}></Navbar>
          </header>
          <main>
            <FriendProfile></FriendProfile>
          </main>
        </Route>
      </Switch>
    </Router>
  );
}
