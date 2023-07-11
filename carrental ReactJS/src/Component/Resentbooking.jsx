import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

const Resentbooking = () => {
  const [RecentList, setRecentList] = React.useState([]);

  const GetrecentBookingList = async () => {
    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("id"));
    const SignUpURL = `http://localhost:5000/detail/booking`;

    axios
      .post(SignUpURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setRecentList(res.data.result);
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
  useEffect(() => {
    GetrecentBookingList();
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
        {RecentList && RecentList.length > 0
          ? RecentList.map((prod) => (
              <div
                className="card col-9 ms-auto me-auto p-4 mt-50"
                style={{
                  backgroundColor:"#d9d9d9",
                }}>
                <div className="row">
                  <div className="col-4 mt-2">
                    <img
                      src={`http://localhost:5000/${prod.carImage}`}
                      height="150px"
                      width="280px"
                    />
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-3">Name</div>
                      <div className="col-9">{prod.Carname}</div>
                    </div>
                    <div className="row">
                      <div className="col-3">modal</div>
                      <div className="col-9">{prod.modal}</div>
                    </div>
                    <hr />
                    <div className="row mt-3">
                      <div className="col-4"> Name</div>
                      <div className="col-8">
                        <b> {prod.FirstName ? prod.FirstName : ""}</b>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-4"> Number</div>
                      <div className="col-8">
                        <b> {prod.Number ? prod.Number : ""}</b>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-3">Email</div>
                      <div className="col-9">
                        <b> {prod.Email ? prod.Email : ""}</b>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-5">Date From</div>
                      <div className="col-7">{prod.DateFrom}</div>
                    </div>
                    <div className="row">
                      <div className="col-5">Date To</div>
                      <div className="col-7">{prod.DateTo}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-5">
                        <small>Payment Status</small>
                      </div>
                      <div className="col-7">
                        <b>
                          {" "}
                          <small>{prod.payment_status}</small>
                        </b>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <small>Payment Id</small>
                      </div>
                      <div className="col-8">
                        <b>
                          {" "}
                          <small>
                            {prod.razorpay_payment_id
                              ? prod.razorpay_payment_id
                              : ""}
                          </small>
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5 mt-5">
                      <lable>Price</lable>
                      <p className="mt-3">
                        <b>
                          {prod.price /
                            ((new Date(prod.DateTo).getTime() -
                              new Date(prod.DateFrom).getTime()) /
                              (1000 * 60 * 60 * 24))}
                        </b>
                      </p>
                    </div>
                    <div className="col-5 mt-5">
                      <lable>Booking Days</lable>
                      <p className="mt-3">
                        <b>
                          {(new Date(prod.DateTo).getTime() -
                            new Date(prod.DateFrom).getTime()) /
                            (1000 * 60 * 60 * 24)}
                        </b>
                      </p>
                    </div>
                    <div className="col-2 mt-5">
                      <lable>Total</lable>
                      <p className="mt-3">
                        <b>{prod.price}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};
export default Resentbooking;
