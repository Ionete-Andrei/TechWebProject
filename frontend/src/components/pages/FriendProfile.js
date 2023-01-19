import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentFriend, currentProducts } from "../../StateManager";
import avatar from "../../resources/images/userPic.svg";
import Axios from "axios";

export default function FriendProfile() {
  let friend = useRecoilValue(currentFriend);
  const [products, setProducts] = useRecoilState(currentProducts);

  function getProducts() {
    Axios.get("http://localhost:8080/products/" + friend.id)
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getProducts();

    let claimButtons = document.getElementsByClassName("claim-button");
    Array.from(claimButtons).forEach((button) => {
      button.addEventListener("click", () => {
        let userId = button.getAttribute("data-userid");
        let foodId = button.getAttribute("data-foodid");

        Axios.delete(`http://localhost:3000/product/${userId}/${foodId}`)
          .then((res) => {
            console.log(res);
            getProducts();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    });
  }, [setProducts]);

  return (
    <div>
      <section className="container-fluid d-flex flex-column align-items-center">
        <img src={avatar} width="100px" height="100px"></img>
        <h2>
          {friend != undefined ? friend.firstName + " " + friend.lastname : ""}
        </h2>
      </section>

      <div className="list product">
        <ul className="w-100">
          {products.map((prod) => {
            return (
              <div className="d-flex justify-content-center" key={prod}>
                <h4>{prod.name} - {prod.quantity} {prod.measurementUnit}&nbsp;&nbsp;&nbsp;</h4>
                <button
                  className="btn btn-success claim-button"
                  data-userid={prod.userId}
                  data-foodid={prod.foodId}
                >
                  Claim
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
