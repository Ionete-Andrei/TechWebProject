import React, { Suspense } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useSetRecoilState } from "recoil";
import { listData, route } from "../../StateManager";
import ObjectList from "../reusables/ObjectList";

export default function Category() {
  const setData = useSetRecoilState(listData);
  const setRoute = useSetRecoilState(route);
  setRoute("categories");

  function getCategories() {
    Axios.get("http://localhost:8080/categories")
      .then((res) => {
        let categoryData = [];
        Array.from(res.data).forEach((element) => {
          categoryData.push({
            id: element.id,
            name: element.name,
          });
        });
        setData(categoryData);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getCategories();

    let categorybutton = document.getElementById("categorybutton");
    categorybutton.addEventListener("click", () => {
      let categoryName = document.getElementById("categoryname");

      Axios.post("http://localhost:8080/categories", {
        name: categoryName.value,
      })
        .then((res) => {
          console.log(res);
          getCategories();
        })
        .catch((err) => {
          console.error(err);
        });
    });

    let categoryUpdateButton = document.getElementById("categorybutton-update");
    categoryUpdateButton.addEventListener("click", () => {
      let categoryId = document.getElementById("categoryid");
      let categoryName = document.getElementById("categoryname");

      if (categoryId.value) {
        // Start update process

        // 1. Get initial value
        Axios.get("http://localhost:8080/categories/" + categoryId.value)
          .then((res) => {
            // 2. Update with new values if given
            Axios.put("http://localhost:8080/categories/" + categoryId.value, {
              name: categoryName.value ? categoryName.value : res.data.name,
            })
              .then(() => getCategories())
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      }
    });
  }, [setData]);

  return (
    <div>
      <h2>Category</h2>

      <form className="container">
        <div className="mb-3">
          <label htmlFor="categoryid" className="form-label">
            Category ID
          </label>
          <input type="number" className="form-control" id="categoryid"></input>
        </div>

        <div className="mb-3">
          <label htmlFor="categoryname" className="form-label">
            Category Name
          </label>
          <input type="text" className="form-control" id="categoryname"></input>
        </div>

        <button type="button" className="btn btn-primary" id="categorybutton">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-success ml-2"
          id="categorybutton-update"
        >
          Update Category
        </button>
      </form>

      <Suspense fallback={<p>Loading...</p>}>
        <ObjectList></ObjectList>
      </Suspense>
    </div>
  );
}
