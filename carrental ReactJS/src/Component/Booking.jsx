import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import React, { useRef } from "react";


const Swal = require("sweetalert2");

const Booking = () => {
  const navigate = useNavigate();
  const Razorpay = useRazorpay();

  const [FirstName, setFirstname] = React.useState("");
  const [LastName, setLastname] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Number, setNumber] = React.useState("");
  const [DateFrom, setDateFrom] = React.useState("");
  const [DateTo, setDateTo] = React.useState("");
  const [id, setid] = React.useState("");
  const [Carname, setCarname] = React.useState("");
  const [modal, setmodal] = React.useState("");
  const [price, setprice] = React.useState("");
  
  const urlParams = new URLSearchParams(window.location.search);
  
  const Handle = (e) => {
    e.preventDefault();
    
    const PostData = {
      carid:urlParams.get('id'),
      DateFrom:DateFrom,
      DateTo:DateTo,
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Number: Number,
      Carname:urlParams.get('name'),
      price:(new Date(DateTo).getTime() - new Date(DateFrom).getTime()) / (1000 * 60 * 60 * 24) * urlParams.get('price'),
      modal:urlParams.get('modal'),
      carImage:urlParams.get('photo'),
      user_id:localStorage.getItem('id')
    };

    const SignUpURL = `http://localhost:5000/add/booking`;
    
    
    axios
      .post(SignUpURL, PostData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          const price = (new Date(DateTo).getTime() - new Date(DateFrom).getTime()) / (1000 * 60 * 60 * 24) * urlParams.get('price')

          const options = {
            key: "rzp_test_qDwTmKnksUVsaC", // Enter the Key ID generated from the Dashboard
            amount: price+"00", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: FirstName,
            description: "Test Transaction",
            // order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
              const formData = {
                razorpay_payment_id:response.razorpay_payment_id,
                payment_status:"Success",
                id:res.data.result.insertId
              }
              
              const AddUserUrl = `http://localhost:5000/update/bookingStatus`;
              axios
                .post(AddUserUrl, formData, {
                  headers: {
                    Accept: "auth",
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  navigate("/recentbooking");
                });    
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
      
          const rzp1 = new Razorpay(options);
      
      
          rzp1.open();
      
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
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
  const inputRef = useRef(null);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const minDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

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
          <h3 className="text-center form-header">Booking Form</h3>
          <form onSubmit={Handle}>
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
                  type="number"
                  placeholder="Enter Your Contact Number"
                  className="form-control"
                  value={Number}
                  onChange={(e) => setNumber(e.target.value)}

                />
              </div>
              <div className="col-6 mt-3">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-control"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 mt-3">
                <label className="text-center"> Date From</label>
                <input
                  type="date"
                  placeholder="Enter Your Full Name"
                  className="form-control"
                  value={DateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  min={minDate} 
                  ref={inputRef}

                />
              </div>
              <div className="col-6 mt-3">
                <label className="text-center"> Date To</label>
                <input
                  type="date"
                  placeholder="Enter Your Email"
                  className="form-control"
                  value={DateTo}
                  min={minDate} 
                  ref={inputRef}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
            <div className="col-2 me-auto ms-auto mt-5">
              <button className="btn btn-outline-warning" type="submit">Book</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Booking;
