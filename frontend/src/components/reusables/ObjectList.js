import Axios from "axios";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listData, route } from "../../StateManager";

/**
 * This component will render a list of elements
 */
export default function ObjectList() {
  const data = useRecoilValue(listData);
  const setData = useSetRecoilState(listData);
  const routeName = useRecoilValue(route);

  useEffect(() => {
    let buttons = document.getElementsByClassName("delete-button");
    Array.from(buttons).forEach((button) => {
      button.addEventListener("click", () => {
        let id = button.id.substring("delete-button-".length);
        Axios.delete(`http://localhost:8080/${routeName}/${id}`)
          .then(() => {
            Array.from(data).forEach((element, index) => {
              if (element.id === id) {
                let newData = data.splice(index, 1);
                setData(newData);
                return;
              }
            });
          })
          .catch((err) => console.error(err));
      });
    });
  }, [data, routeName, setData]);

  return (
    <div className="container mt-3">
      <ul className="list-group">
        {Array.from(data).map((value, index) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={index}
            >
              <span>
                {value.id} {value.name}
              </span>
              <button
                id={"delete-button-" + value.id}
                className="btn btn-danger delete-button"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
