import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

function Cartpage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItems) => {
      temp = temp + cartItems.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };



  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phone
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email : JSON.parse(localStorage.getItem('currentUser')).user.email,
      userid : JSON.parse(localStorage.getItem('currentUser')).user.uid
    }

    try {
      setLoader(true)
      const result = await addDoc(collection(fireDB, "Orders"), orderInfo )
      setLoader(false)
      toast.success("You Have Been Enrolled this opportunity:)")
      handleClose()
    } catch (error){
      setLoader(false)

      toast.error("Order Failed :(")
      
    }
  }


  return (
    <Layout loader={loader}>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Courses</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80" width="80" />{" "}
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)}  style={{color:"#af3131"}}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h4 className="total-amount"> Fees= {totalAmount} /</h4>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>Enroll Course Now !</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Type Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>Registration</h2>
            <hr />

            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <textarea className="form-control" rows={3}
              type="text"
              placeholder="Your Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <input
              type="number"
              className="form-control"
              placeholder="Pin Code"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
             <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
        
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeOrder}>Enroll Course !</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default Cartpage;
