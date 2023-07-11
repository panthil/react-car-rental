import React from "react";
import ServiceBox from "../Container/ServiceBox";

const Services = () => {
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo consequuntur modi vitae ducimus itaque quia. Incidunt, quas quo! Est quibusdam eos dolore corporis exercitationem magni, tenetur accusantium iste facere perferendis?";
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
        <h2 className="mt-3">Services Overview</h2>
        <div className="row mt-3">
          <div className="col-md-4 mt-3">
            <ServiceBox
              image={require("../Assets/images/page4_img1.jpg")}
              title="Over Service"
              description={description}
            />
          </div>
          <div className="col-md-4 mt-3">
            <ServiceBox
              image={require("../Assets/images/page4_img2.jpg")}
              title="Over Service"
              description={description}
            />
          </div>
          <div className="col-md-4 mt-3">
            <ServiceBox
              image={require("../Assets/images/page4_img3.jpg")}
              title="Over Service"
              description={description}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4 mt-3">
            <ServiceBox
              image={require("../Assets/images/page4_img4.jpg")}
              title="Over Service"
              description={description}
            />
          </div>
          <div className="col-md-4 mt-3">
            <ServiceBox
              image={require("../Assets/images/page4_img5.jpg")}
              title="Over Service"
              description={description}
            />
          </div>
          <div className="col-md-4 mt-3">
            <ServiceBox
              image={require("../Assets/images/page4_img6.jpg")}
              title="Over Service"
              description={description}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4 mt-3">
            <ServiceBox
              image={require("../Assets/images/page4_img7.jpg")}
              title="Over Service"
              description={description}
            />
          </div>
          <div className="col-md-4 mt-3">
            <ServiceBox
              image={require("../Assets/images/page4_img8.jpg")}
              title="Over Service"
              description={description}
            />
          </div>{" "}
          <div className="col-md-4 mt-3">
            <ServiceBox
              image={require("../Assets/images/page4_img9.jpg")}
              title="Over Service"
              description={description}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Services;
