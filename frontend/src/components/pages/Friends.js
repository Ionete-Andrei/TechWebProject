import React, { Suspense, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentFriend, friends, user } from "../../StateManager";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Friends() {
  const currentUser = useRecoilValue(user);
  const [currentFriends, setCurrentFriends] = useRecoilState(friends);
  const setCurrentFriend = useSetRecoilState(currentFriend);
  const history = useHistory();

  function getFriends() {
    Axios.get("http://localhost:8080/friends/" + currentUser.id)
      .then((res) => {
        setCurrentFriends(res.data.friends);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (currentUser == undefined) {
    history.push("/");
  }

  function saveTag(element, f) {
    if (element.checked) {
      Axios.put(`http://localhost:3000/users/${f.id}`, {
        firstName: f.firstName,
        lastname: f.lastname,
        userType: f.userType,
        email: f.email,
        tag: element.value,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch(console.log);
    }
  }

  useEffect(() => {
    let addFriendButton = document.getElementById("add-friend-button");
    let friendEmailInput = document.getElementById("email");

    // Clear invites upon entering this page
    Axios.put("http://localhost:3000/invites", {
      //the route from the server where we update the invites
      id: currentUser.id,
      invites: [],
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    addFriendButton.addEventListener("click", () => {
      // Define the Axios request that adds a new friend
      Axios.post("http://localhost:8080/friends", {
        currentUserEmail: currentUser.email,
        friendEmail: friendEmailInput.value,
      })
        .then((res) => {
          getFriends();
        })
        .catch((err) => {
          console.error(err);
        });
    });
    // Get radio buttons
    currentFriends.forEach((f) => {
      let vegetarian = document.getElementById("vegetarian-" + f.id);
      let carnivor = document.getElementById("carnivor-" + f.id);
      let zacusca = document.getElementById("zacusca-" + f.id);

      switch (f.tag) {
        case "vegetarian":
          vegetarian.checked = true;
          break;
        case "carnivor":
          carnivor.checked = true;
          break;
        case "zacusca":
          zacusca.checked = true;
          break;
      }

      [vegetarian, carnivor, zacusca].forEach((radio) => {
        radio.addEventListener("change", (ev) => {
          saveTag(ev.target, f);
        });
      });

      // Add click event for invite buttons
      let inviteButton = document.getElementById("invite-button-" + f.id);

      // The invites of the one I want to invite
      let invites = JSON.parse(f.invites); //convert the string of invites into an array of objects json
      if (!invites) {
        invites = [
          {
            id: currentUser.id,
            name: currentUser.firstName + " " + currentUser.lastname,
          },
        ];
      } else {
        invites.push({
          id: currentUser.id,
          name: currentUser.firstName + " " + currentUser.lastname,
        });
      }

      //"[{id: 2}, {id: 4}, {id: 8}]"

      inviteButton.addEventListener("click", () => {
        Axios.put("http://localhost:3000/invites", {
          //the route from the server where we update the invites
          id: f.id,
          invites: invites,
        })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      });

      // Add event listener for navigation to frind profile
      let viewButton = document.getElementById("view-" + f.id);
      viewButton.addEventListener("click", () => {
        setCurrentFriend(f);
        history.push("/profile/friend");
      });
    });
  }, [setCurrentFriends]);

  return (
    <div>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email"></input>
        </div>
        <button type="button" className="btn btn-primary" id="add-friend-button">
          Add friend
        </button>
      </form>
      <Suspense fallback={<p>Loading...</p>}>
      <form>
        <section className="mt-4">
          {currentFriends.map((f) => {
            return (
              <div
                className="container-fluid d-flex justify-content-center mt-3 friendRow"
                key={f.email}
              >
                <h4>
                  {f.firstName} {f.lastname} ({f.email}) &nbsp;&nbsp;&nbsp;
                </h4>

                <div>
                  <input className="mr-1" id={"vegetarian-" + f.id} type="radio" name="tag" value="vegetarian"></input>
                  <label className="mr-2" htmlFor="vegetarian">
                    Vegetarian
                  </label>
                </div>

                <div>
                  <input className="mr-1" id={"carnivor-" + f.id} type="radio" name="tag" value="carnivor"></input>
                  <label className="mr-2" htmlFor="carnivor">
                    Carnivor
                  </label>
                </div>

                <div>
                  <input className="mr-1" id={"zacusca-" + f.id} type="radio" name="tag" value="zacusca"></input>
                  <label className="mr-2" htmlFor="zacusca">
                    Raw Vegan
                  </label>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;
                </div>
                <div>
                  <button className="btn btn-success mr-1" id={"invite-button-" + f.id}>
                    Invite to see fridge
                  </button>
                  <button className="btn btn-primary" id={"view-" + f.id}>
                    View Fridge
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </form>
      </Suspense>
    </div>
  );
}
