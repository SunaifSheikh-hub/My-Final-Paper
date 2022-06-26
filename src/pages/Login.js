import React, { useState } from "react";
import { Link } from "react-router-dom";
import ecommercegif from "../images/ecommerce.gif";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [loader, setLoader] = useState(false);
  const auth = getAuth();

  const login = async () => {
    try {
      setLoader(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");
      setLoader(false);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");

      setLoader(false);
    }
  };

  return (
    <div className="login-parent">
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20" }}
      >
        <span>Welcome To !</span>{" "}
        <h2
          style={{
            position: "absolute",
            marginTop: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Saylani Mass IT Training
        </h2>
      </div>
      {loader && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Login</h2>
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

            <button className="my-3" onClick={login}>
              Login Now
            </button>
          </div>

          <hr />

          <Link to="/register"> Click Here To Register</Link>
        </div>

        <div className="col-md-5">
          {/* <img src={ecommercegif} width={600} height={500} /> */}
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_9rfdfjek.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div className="login-bottom"></div>
    </div>
  );
}

export default Login;
