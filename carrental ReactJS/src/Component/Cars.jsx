import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarAddModel from "../Layouts/CarAddModel";
import CarStatusModel from "../Layouts/CarStatusModel";
import CarBox from "../Container/CarBox";
const Swal = require("sweetalert2");

const SingleCars = () => {
  const [EconomyData, setEconomyData] = React.useState("");
  const [StandardData, setStandardData] = React.useState("");
  const [LuxData, setLuxData] = React.useState("");
  const GetEconomyData = async () => {
    const formData = new FormData();
    formData.append("category", "Economy");
    const SignUpURL = `http://localhost:5000/detail/car`;

    axios
      .post(SignUpURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setEconomyData(res.data.result);
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
  const GetStandardDataList = async () => {
    const formData = new FormData();
    formData.append("category", "Standard");
    const SignUpURL = `http://localhost:5000/detail/car`;

    axios
      .post(SignUpURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setStandardData(res.data.result);
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
  const GetLuxuryData = async () => {
    const formData = new FormData();
    formData.append("category", "Lux");
    const SignUpURL = `http://localhost:5000/detail/car`;

    axios
      .post(SignUpURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setLuxData(res.data.result);
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
    GetStandardDataList();
    GetLuxuryData();
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
          <div className="addcarbtn col-2 ms-auto">
            {localStorage.getItem("admin") == "1" ? (
              <button
                type="button"
                className="btn btn-outline-warning ms-auto"
                data-bs-toggle="modal"
                data-bs-target="#addcarmodal">
                Add Car
              </button>
            ) : (
              ""
            )}
            <br></br>
            <br></br>
            {localStorage.getItem("admin") != "1" ? (
            <select class="form-control" onChange={changeClick}>
              <option value="">Select Any One</option>
              <option value="Economy">Economy</option>
              <option value="Standard">Standard</option>
              <option value="Lux">Luxury</option>
            </select>
             ) : (
              ""
            )}
          </div>
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
        <h2 className="mt-3">Economy</h2>
        <div className="row mt-3">
          {EconomyData ? EconomyData.map((prod) => <CarBox prod={prod} />) : ""}
        </div>
        <h2 className="mt-3">Standard</h2>
        <div className="row mt-3">
          {StandardData
            ? StandardData.map((prod) => <CarBox prod={prod} />)
            : ""}
        </div>
        <h2 className="mt-3">Lux</h2>
        <div className="row mt-3">
          {LuxData ? LuxData.map((prod) => <CarBox prod={prod} />) : ""}
        </div>
      </div>
    </>
  );
};

export default SingleCars;
