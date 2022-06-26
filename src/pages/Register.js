import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import ecommerceGif from "../images/e-commerce.gif";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [loader, setLoader] = useState(false);
  const auth = getAuth();

  const register = async () => {
    try {
      setLoader(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      toast.success("Registration Successful");
      setLoader(false);
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");

      setLoader(false);
    }
  };

  return (

    
    <div className="register-parent">

      {loader && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_zzauuadl.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>Registration</h2>
            <hr />

            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Conform password"
              value={cPassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />

            <button className="my-3" onClick={register}>
              Register Now
            </button>

            <hr />

            <Link to="/login"> Click Here To Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
