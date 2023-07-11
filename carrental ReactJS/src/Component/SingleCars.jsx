import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarAddModel from "../Layouts/CarAddModel";
import CarStatusModel from "../Layouts/CarStatusModel";
import CarBox from "../Container/CarBox";
const Swal = require("sweetalert2");

const Cars = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [Data, setData] = React.useState("");
  const GetEconomyData = async () => {
    const formData = new FormData();
    formData.append("category", urlParams.get("value"));
    const SignUpURL = `http://localhost:5000/detail/car`;

    axios
      .post(SignUpURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setData(res.data.result);
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

  const changeClick = async (e) => {
    if (e.target.value !== "")
      window.location.href = "/singlecars?value=" + e.target.value;
  };
  useEffect(() => {
    GetEconomyData();
  }, []);
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
        {/* <!-- add car modal --> */}
        <div className="addcar mt-5 mb-5">
          <div className="addcarform">
            {/* <!-- Modal --> */}
            <CarAddModel />
          </div>
        </div>
        {/* <!-- car status modal --> */}
        <div className="status mt-5 mb-5">
          <div className="statusform">
            {/* <!-- Modal --> */}
            <CarStatusModel />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <h2 className="mt-3">{urlParams.get("value")}</h2>
          </div>
          <div className="col-3 mt-2 ms-auto">
            <select
              class="form-control"
              value={urlParams.get("value")}
              onChange={changeClick}>
              <option value="">Select Any One</option>
              <option value="Economy">Economy</option>
              <option value="Standard">Standard</option>
              <option value="Lux">Luxury</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          {Data ? Data.map((prod) => <CarBox prod={prod} />) : ""}
        </div>
      </div>
    </>
  );
};

export default Cars;
