import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

const Registration = () => {
  const navigate = useNavigate();

  const [FirstName, setFirstname] = React.useState("");
  const [LastName, setLastname] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [DateOfBirth, setDateOfBirth] = React.useState("");
  const [Gender, setGender] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Number, setNumber] = React.useState("");

  const HandleSignup = (e) => {
    e.preventDefault();
    if (
      FirstName === "" ||
      LastName === ""||
      Email === "" ||
      Password === ""||
      DateOfBirth === ""||
      Gender === ""||
      Number === "" ||
      Address === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please Enter Valid Details",
        showConfirmButton: true,
      });
      return false;
    }
    const PostData = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password: Password,
      DateOfBirth: DateOfBirth,
      Gender: Gender,
      Address: Address,
      Number: Number,
    };

    const SignUpURL = `http://localhost:5000/signup`;

    axios
      .post(SignUpURL, PostData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
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
      <div className="logo">
        <img
          src={require("../Assets/images/logos.png")}
          height="100%"
          width="100%"
        />
      </div>
      <div className="container mb-5">
        <div className="card col-6 ms-auto me-auto p-5">
          <h3 className="text-center form-header">Registration Form</h3>
          <form onSubmit={HandleSignup}>
            <div className="row">
              <div className="col-6 mt-3">
                <input
                  type="text"
                  placeholder="Enter Your First Name"
                  className="form-control"
                  value={FirstName}
                  onChange={(e) => setFirstname(e.target.value)}
                 
                />
              </div>
              <div className="col-6 mt-3">
                <input
                  type="text"
                  placeholder="Enter Your Last Name"
                  className="form-control"
                  value={LastName}
                  onChange={(e) => setLastname(e.target.value)}
                 
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 mt-3">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-control"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                 
                />
              </div>
              <div className="col-6 mt-3">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="form-control"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                   
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 mt-3">
                <label className="text-center"> Date Of Birth</label>
                <input type="date" className="form-control"  value={DateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              />
              </div>
              <div className="col-6 mt-3">
                <label className="text-center"> Gender</label>
                <div className="row mt-1">
                  <div className="col-6">
                    <input 
              onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="Male" />
                    Male
                  </div>
                  <div className="col-6">
                    <input 
              onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="Female" />
                    Female
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-3">
                <input
                  type="number"
                  placeholder="Enter Your Contact Number"
                  className="form-control"
                  value={Number}
                  onChange={(e) => setNumber(e.target.value)}
                 
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-3">
                <textarea
                  placeholder="Enter Your Address"
                  className="form-control"
                  rows="3"
                  value={Address}
              onChange={(e) => setAddress(e.target.value)}
             
                ></textarea>
              </div>
            </div>
            <div className="mt-3">
              <p>
                Already have an account &nbsp;
                <Link to="/login" className="text-warning">
                  Login here
                </Link>
              </p>
            </div>
            <div className="col-2 me-auto ms-auto mt-5">
              <button className="btn btn-outline-warning">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Registration;
