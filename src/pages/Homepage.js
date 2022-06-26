import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { FireProduct } from "../Products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";
import { Carousel } from "react-bootstrap";
// import { Link } from "react"

function Homepage() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoader(true);

      const users = await getDocs(collection(fireDB, "products"));

      const productsArray = [];

      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
        setLoader(false);
      });

      console.log(productsArray);

      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addtocart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  console.log(products);

  return (
    <Layout loader={loader}>



      <div className="container">
        <div className="d-flex w-50 align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />

          <select
            className="form-control"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="webcourse">Web and mobile development</option>
            <option value="aicourse">Artifical Intelligence</option>
            <option value="graphiccourse">Graphic Designing</option>
          </select>
        </div>

        {/* slides */}
        <Carousel>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src="https://hassanhaidry.github.io/Sylani%20Welfate%20Trust%203rd%20assi_files/slider2.png"
      alt="First slide"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100"
      src="https://en.dailypakistan.com.pk/digital_images/extra-large/2020-04-28/ubl-partners-with-saylani-trust-for-nation-wide-ration-distribution-project-1588074267-6155.jpg"
      alt="Second slide"
    />
    <Carousel.Caption>

    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i.ytimg.com/vi/bK5mUs_jjM8/maxresdefault.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>

    </Carousel.Caption>
  </Carousel.Item>
</Carousel>



        <div className="row">
          {products &&
            products.length > 0 &&
            products
              .filter(
                (obj) =>
                  obj.name &&
                  obj.name !== undefined &&
                  obj.name
                    .toLocaleLowerCase()
                    .includes(searchKey.toLocaleLowerCase())
              )
              .filter(
                (obj) =>
                  obj.category &&
                  obj.category !== undefined &&
                  obj.category
                    .toLocaleLowerCase()
                    .includes(filterType.toLocaleLowerCase())
              )

              .map((product, ind) => {
                return (
                  <div key={ind} className="col-md-4">
                    <div className="m-2 p-1 product position-relative">
                      <div className="product-content">
                        <p>{product.name}</p>
                        <div className="text-center">
                          <img
                            src={product.imageURL}
                            alt=""
                            className="product-img"
                          />
                        </div>
                      </div>

                      <div className="product-actions">
                        <h2>{product.price} Fee/</h2>
                        <div className="d-flex">
                          <button
                            className="mx-2 btn1"
                            onClick={() => addtocart(product)}
                          >
                            Add to profile
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/productinfo/${product.id}`);
                            }}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
              }
        </div>
      </div>
    </Layout>
  );
}

<Link to="/register"> Click Here To Register</Link>

export default Homepage;
