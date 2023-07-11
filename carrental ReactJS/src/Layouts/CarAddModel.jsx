import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

const CarAddModel = () => {
  const navigate = useNavigate();
  const [name, setname] = React.useState("");
  const [modal, setmodal] = React.useState("");
  const [price, setprice] = React.useState("");
  const [category, setcategory] = React.useState("");
  
  const [image, setimage] = React.useState({
    file: [],
  });
  const [files, setFiles] = React.useState([]);
  
  const handleimginput = (e) => {
    setimage({
      ...image,
      file: e.target.files,
      // filepreview: URL.createObjectURL(e.target.files[0]),
    });
    setFiles(e.target.files);
  };
  const Hsubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      modal === "" ||
      price === "" ||
      files.length<=0 ||
      category === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please Enter Valid Details",
        showConfirmButton: true,
      });
      return false;
    }
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("name", name);
    formData.append("modal", modal);
    formData.append("price", price);
    formData.append("category", category);
    
    const SignUpURL = `http://localhost:5000/add/car`;

    axios
      .post(SignUpURL, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          window.location.href=window.location.href;
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          // navigate("/user-login");
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
      <div
        className="modal fade"
        id="addcarmodal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title text-warning" id="exampleModalLabel">
                Add Cars
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={Hsubmit}>
                <div className="row">
                  <div className="col-6 mt-3">
                    <input
                      type="text"
                      placeholder="Enter Car Name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div className="col-6 mt-3">
                    <input
                      type="text"
                      placeholder="Enter Modal"
                      className="form-control"
                      value={modal}
                      onChange={(e) => setmodal(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mt-3">
                    <input
                      type="number"
                      placeholder="Enter Per Day Price"
                      className="form-control"
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                    />
                  </div>
                  <div className="col-6 mt-3">
                    <select className="form-select" value={category}
                      onChange={(e) => setcategory(e.target.value)}>
                      <option>Select Car Category</option>
                      <option>Economy</option>
                      <option>Standard</option>
                      <option>Lux</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-3">
                    <input type="file" className="form-control" onChange={handleimginput}
                  multiple />
                  </div>
                </div>
                <div className="col-3 me-auto ms-auto mt-5">
                  <button className="btn btn-outline-warning">Add Car</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarAddModel;
