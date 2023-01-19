import Axios from "axios";
import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { listData, route } from "../../StateManager";
import ObjectList from "../reusables/ObjectList";

export default function Food() {
  let [categories, setCategories] = useState([]);

  const [data, setData] = useRecoilState(listData);
  const setRoute = useSetRecoilState(route);
  setRoute("food");

  function getFood() {
    Axios.get("http://localhost:8080/food")
      .then((res) => {
        let foodData = [];
        Array.from(res.data).forEach((element) => {
          foodData.push({
            id: element.id,
            name: element.name,
          });
        });
        setData(foodData);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    Axios.get("http://localhost:8080/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error(err));

    getFood();

    let foodbutton = document.getElementById("foodbutton");
    foodbutton.addEventListener("click", () => {
      let foodName = document.getElementById("foodname");
      let categorySelect = document.getElementById("category");
      let categoryId = categorySelect.options[categorySelect.selectedIndex].id;

      Axios.post("http://localhost:8080/food", {
        name: foodName.value,
        categoryId: categoryId,
      })
        .then((res) => {
          console.log(res);
          getFood();
        })
        .catch((err) => {
          console.error(err);
        });
    });

    let foodUpdateButton = document.getElementById("foodbutton-update");
    foodUpdateButton.addEventListener("click", () => {
      let foodId = document.getElementById("foodid");
      let foodName = document.getElementById("foodname");
      let categorySelect = document.getElementById("category");
      let categoryId = categorySelect.options[categorySelect.selectedIndex].id;

      if (foodId.value) {
        // We can start the update process

        // 1. Find the old reccord
        Axios.get("http://localhost:8080/food/" + foodId.value)
          .then((res) => {
            // 2. We update it with new values if they were given
            Axios.put("http://localhost:8080/food/" + foodId.value, {
              name: foodName.value ? foodName.value : res.data.name,
              categoryId: categoryId ? categoryId : res.data.categoryId,
            })
              .then(() => {
                getFood();
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      }
    });
  }, [setCategories, setData]);

  return (
    <div>
      <h2>Food</h2>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="foodid" className="form-label">
            Food ID
          </label>
          <input type="number" className="form-control" id="foodid"></input>
        </div>

        <div className="mb-3">
          <label htmlFor="foodname" className="form-label">
            Food Name
          </label>
          <input type="text" className="form-control" id="foodname"></input>
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            id="category"
          >
            <option defaultValue>Open this select menu</option>

            {categories.map((value, index) => {
              return (
                <option id={value.id} key={index}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>

        <button type="button" className="btn btn-primary" id="foodbutton">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-success ml-2"
          id="foodbutton-update"
        >
          Update Food
        </button>
      </form>

      <Suspense fallback={<p>Loading...</p>}>
        <ObjectList></ObjectList>
      </Suspense>
    </div>
  );
}
