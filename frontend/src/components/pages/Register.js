import React, { Suspense } from "react";
import ObjectList from "../reusables/ObjectList";
import { useSetRecoilState } from "recoil";
import { listData, route } from "../../StateManager";
import { useEffect } from "react";
import Axios from "axios";
import Jumbotron from "../reusables/JumbotronRegister";
import { useHistory } from "react-router-dom";
import JumbotronRegister from "../reusables/JumbotronRegister";

export default function Register() {
  const history = useHistory();

  useEffect(() => {
    let userbutton = document.getElementById("userbutton");
    userbutton.addEventListener("click", () => {
      let lastName = document.getElementById("lastname");
      let firstName = document.getElementById("firstname");
      let email = document.getElementById("email");
      let userType = document.getElementById("usertype");

      Axios.post("http://localhost:8080/users", {
        firstName: firstName.value,
        lastname: lastName.value,
        email: email.value,
        userType: userType.value,
      })
        .then((res) => {
          console.log(res);
          history.push("/login");
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, []);

  return (
    <div>
      <JumbotronRegister></JumbotronRegister>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input type="text" className="form-control" id="lastname"></input>
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input type="text" className="form-control" id="firstname"></input>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email"></input>
        </div>
        <div className="mb-3">
          <select
            className="form-select custom-select"
            aria-label="Default select example"
            id="usertype"
          >
            <option defaultValue>Choose account type</option>
            <option value="person">Person</option>
            <option value="company">Company</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" id="userbutton">
          Register
        </button>
        <button
          type="button"
          className="btn btn-success ml-2"
          id="userbutton-update"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
