import React, { Suspense } from "react";
import { useEffect } from "react";
import Axios from "axios";
import ObjectList from "../reusables/ObjectList";
import { useSetRecoilState } from "recoil";
import { listData, route } from "../../StateManager";

export default function User() {
  const setData = useSetRecoilState(listData);
  const setRoute = useSetRecoilState(route);
  setRoute("users");

  function getUsers() {
    Axios.get("http://localhost:8080/users")
      .then((res) => {
        let userData = [];
        Array.from(res.data).forEach((element) => {
          let dataElement = {
            id: element.id,
            name: element.firstName + " " + element.lastname,
          };
          userData.push(dataElement);
        });
        setData(userData);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    // Getting the existing users from the database
    getUsers();

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
          getUsers();
        })
        .catch((err) => {
          console.error(err);
        });
    });

    let userUpdateButton = document.getElementById("userbutton-update");
    userUpdateButton.addEventListener("click", () => {
      let userId = document.getElementById("userid");
      let lastName = document.getElementById("lastname");
      let firstName = document.getElementById("firstname");
      let email = document.getElementById("email");
      let userType = document.getElementById("usertype");

      if (userId.value) {
        // We begin the update process

        // 1. Retrieve original value
        Axios.get("http://localhost:8080/users/" + userId.value)
          .then((res) => {
            // 2. We update record with new values if given
            Axios.put("http://localhost:8080/users/" + userId.value, {
              firstName: firstName.value ? firstName.value : res.data.firstName,
              lastname: lastName.value ? lastName.value : res.data.lastname,
              email: email.value ? email.value : res.data.email,
              userType: userType.value ? userType.value : res.data.userType,
            })
              .then(() => getUsers())
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      }
    });
  }, [setData]);

  return (
    <div>
      <h2>User</h2>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="userid" className="form-label">
            User ID
          </label>
          <input type="number" className="form-control" id="userid"></input>
        </div>

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
            className="form-select"
            aria-label="Default select example"
            id="usertype"
          >
            <option defaultValue>Open this select menu</option>
            <option value="1">Person</option>
            <option value="2">Company</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" id="userbutton">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-success ml-2"
          id="userbutton-update"
        >
          Update User
        </button>
      </form>

      <Suspense fallback={<p>Loading...</p>}>
        <ObjectList></ObjectList>
      </Suspense>
    </div>
  );
}
