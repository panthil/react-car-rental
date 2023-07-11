import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

const updateStatus = async (value,id)=>{
  const formData = new FormData();
  formData.append('id', id);
  formData.append('status', value);
  
  const SignUpURL = `http://localhost:5000/update/status`;

  axios
    .post(SignUpURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.success === true) {
        window.location.href=window.location.href;
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "warning",
        title: err.response.data.message,
        showConfirmButton: true,
      });
    });
}
const CarBox = ({ prod }) => {

  return (
    <>
      <div className="col-md-4 mt-3">

        <a href={`http://localhost:5000/${prod.image}`} target="_blank" className="gal">
          <img src={`http://localhost:5000/${prod.image}`} alt="" height={"250px"} />
        </a>
        <div className="detail">
          <div>
            <h4>
              Car Name :- <span className="color1">{prod.name}</span>
            </h4>
            <h4>
              Modal :- <span className="color1">{prod.modal}</span>
            </h4>
          </div>
          <div>
            <h4>
              <span className="color1">&#x20B9; {prod.price}/DAY</span>
            </h4>
          </div>
        </div>
        <div >
          {localStorage.getItem('admin')!== "1"&&localStorage.getItem('id') && prod.status === "Available"?(<Link
            to={`/booking?id=${prod.id}&name=${prod.name}&price=${prod.price}&modal=${prod.modal}&photo=${prod.image}`}
            className="btn btn-warning"
            style={{ marginRight: "10px" }}
          >
            Book Car
          </Link>):("")}
          {localStorage.getItem('admin')=== "1" ?(
          // <button
          //   type="button"
          //   data-bs-toggle="modal"
          //   data-bs-target="#carstatus"
          //   className="btn btn-warning "
            
          // >
          //   status
          // </button>
          <select className="form-control" value={prod.status} onChange={(e)=>updateStatus(e.target.value,prod.id)}>
            {/* <option value="">Select Any One</option> */}
            <option value="Available">Available</option>
            <option value="UnAvailable"> UnAvailable</option>
          </select>
          ):('')}
        </div>
      </div>

    </>
  );
};

export default CarBox;
