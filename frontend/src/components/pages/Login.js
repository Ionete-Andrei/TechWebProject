import React, { Suspense, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { listData, route, user } from "../../StateManager";
import Jumbotron from "../reusables/JumbotronLogin";
import ObjectList from "../reusables/ObjectList";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login() {
  const setUser = useSetRecoilState(user);
  const history = useHistory();

  useEffect(() => {
    var loginButton = document.getElementById("login-button");
    let email = document.getElementById("email");
    loginButton.addEventListener("click", () => {
      Axios.get("http://localhost:8080/users/email/" + email.value)
      .then(res => {
        setUser(res.data);
        console.log(res.data);
        history.push("/profile")
      })
      .catch(err => {
        console.error(err);
      });
    })
  }, []);

  return (
    <div>
      <Jumbotron></Jumbotron>
      <form className="container product">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email"></input>
          </div>
        <button
          type="button"
          className="btn btn-primary"
          id="login-button"
        >
          Login
        </button>
      </form>
    </div>
  );
}
