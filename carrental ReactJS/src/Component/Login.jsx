import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

const Login = () => {
  const navigate = useNavigate()

  // const [loginError, setLoginError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const userData = {
      Email: email,
      Password: password,
    };
    // console.log(userData);

    const LoginUrl = `http://localhost:5000/user_login`;
    axios
      .post(LoginUrl, JSON.stringify(userData), {
        headers: {
          Accept: "auth",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const login = response.data;
        if (login.success === true) {
          localStorage.clear();
          localStorage.setItem("email", login.result.Email);
          localStorage.setItem("userdetails", login.result);
          localStorage.setItem("id", login.result.id);
          localStorage.setItem("admin", login.result.admin);

          navigate("/")
          // store.set("token", login.token);
          // store.set("user", email);
          // store.set("role", login.result.role);
          // router.push("/employeedetail");
        }else{
          localStorage.clear();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: err.response.data.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <>
      <div class="logo">
        <img
          src={require("../Assets/images/logos.png")}
          height="100%"
          width="100%"
        />
      </div>
      <div class="container mb-5">
        <div class="card col-6 ms-auto me-auto p-5">
          <h3 class="text-center form-header">Login Form</h3>
          <form onSubmit={handleSubmitClick}>
            <div class="row">
              <div class="col-6 mt-3">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  class="form-control"
                  value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="col-6 mt-3">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  class="form-control"
                  value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div class="mt-3">
              <p>
                Don't have an account &nbsp;
                <Link to="/registration" class="text-warning">
                  Register here
                </Link>
              </p>
            </div>
            <div class="col-2 me-auto ms-auto mt-5">
              <button class="btn btn-outline-warning" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
