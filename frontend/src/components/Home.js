import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterLoginNavbar from "./RegisterLoginNavbar"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Goal from "./goal.jpg";
import Company from "./company1.png";
import { useSetRecoilState } from "recoil";
import ProfileNavbar from "./pages/ProfileNavbar"
import Recipes from "./pages/Recipes"
 

import Profile from "./pages/Profile"



export default function Home() {

 
  return (
    <Router>
      
      <main>
        <Switch>
          <Route exact path="/">
          <header>
        <RegisterLoginNavbar></RegisterLoginNavbar>
        <div className='header'>
          <span className='header-title'>
            <b>Food-Waste</b>
          </span>
          <br />
          <span className='header-text'>
            <b>This app is about..</b>
          </span>
        </div>

      </header>

              <div className="row">
                <div className="column">
                  <div className="img">
                    <img id="company" src={Company} />
                  </div>
                </div>

                <div className="column">
                  <div className="info">
                    <h1>About us</h1>
                    <br />
                    <h2>Description</h2>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="column">
                  <div className="img">
                    <img id="goal" src={Goal} />
                  </div>
                </div>

                <div className="column">
                  <div className="info">
                    <h1>Our goal</h1>
                    <br />
                    <h2>Description</h2>
                  </div>
                </div>
              </div>


            
          </Route>
          <Route exact path="/login" >
          <header>
        <RegisterLoginNavbar></RegisterLoginNavbar>
        <div className='header'>
          <span className='header-title'>
            <b>Food-Waste</b>
          </span>
          <br />
          <span className='header-text'>
            <b>This app is about..</b>
          </span>
        </div>

      </header>
            <Login />
          </Route>
          <Route path="/register">
          <header>
        <RegisterLoginNavbar></RegisterLoginNavbar>
        <div className='header'>
          <span className='header-title'>
            <b>Food-Waste</b>
          </span>
          <br />
          <span className='header-text'>
            <b>This app is about..</b>
          </span>
        </div>

      </header>
            <Register />
          </Route>

          <Route path="/profile">
          <header>
        <ProfileNavbar></ProfileNavbar>
        <div className='header'>
          <span className='header-title'>
            <b>Food-Waste</b>
          </span>
          <br />
          <span className='header-text'>
            <b>This app is about..</b>
          </span>
        </div>

      </header>
            <Profile/>
          </Route>
          <Route path="/recipes">
          <header>
        <ProfileNavbar></ProfileNavbar>
        <div className='header'>
          <span className='header-title'>
            <b>Food-Waste</b>
          </span>
          <br />
          <span className='header-text'>
            <b>This app is about..</b>
          </span>
        </div>

      </header>
            <Recipes/>
          </Route>
        </Switch>



      </main>


      <footer>
      
      </footer>
    </Router>
  );
}


