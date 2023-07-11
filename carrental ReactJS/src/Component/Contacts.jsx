import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

const Contacts = () => {
  const [Name, setName] = React.useState("");
  const [Number, setNumber] = React.useState("");
  const [Message, setMessage] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (
      Message === "" ||
      Number === "" ||
      Email === "" ||
      Name === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please Enter Valid Details",
        showConfirmButton: true,
      });
      return false;
    }
    // console.log(userData);
    const formData = new FormData();
    formData.append("Message", Message);
    formData.append("Number",Number);
    formData.append("Email", Email);
    formData.append("Name", Name);
    const AddUserUrl = `http://localhost:5000/add/contactus`;
    axios
      .post(AddUserUrl, formData, {
        headers: {
          Accept: "auth",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const login = response.data;
        if (login.success === true) {
          Swal.fire({
            icon: "success",
            title: "Request Sent  successfully",
            showConfirmButton: true,
          });  
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
        <div className="row">
          <div className="col-12">
            <h3>Find Us</h3>
            <div className="map">
              <figure>
                <iframe
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=gujarat%20india+(Your%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  style={{ border: "0" }}
                ></iframe>
              </figure>
            </div>
          </div>
          <div className="col-5">
            <h3>Contact Info</h3>
            <div className="map">
              <div className="text1 color2">
                Lorem ipsum dolor sit amet, consecteturpiscinger elit um dolor
                sit amet, consecteturpiscing.
              </div>
              <p>Don’t forget, 24/7 support is available for Customer</p>

              <address>
                <dl>
                  <dt>
                    123 Road <br />
                    Abc Complex,
                    <br />
                    xyz State india.
                  </dt>
                  <dd>
                    <span>Telephone:</span> +91 987 4561 230
                  </dd>
                  <dd>
                    E-mail:{" "}
                    <a href="#" className="text-warning">
                      abc@gmail.com
                    </a>
                  </dd>
                </dl>
              </address>
            </div>
          </div>
          <div className="col-6 prefix_1">
            <h3>Contact Form</h3>
            <form id="form" onSubmit={handleSubmitClick}>
              <div className="row">
                <div className="col-6 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name:"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-6 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="E-mail:"
                      value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
              </div>
              <div className="row">
                <div className="col-6 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone:"
                      value={Number}
                    onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <div className="col-6 mt-2">
                    <textarea
                      className="form-control"
                      placeholder="Message:"
                      value={Message}
                    onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
              </div>

              <div className="col-2 ms-auto mt-4 me-auto">
                <button type="submit" className="btn btn-warning">
                  Contact US
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
