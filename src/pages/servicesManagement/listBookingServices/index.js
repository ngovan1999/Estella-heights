import React from "react";
import "./styles.css";
import ContentBooking from "./ContentBooking";
function ListBookingServices(props) {
  return (
    <div className="container">
      <h1 className="up-text color-title fs-32 fw-500 mb-50 border-bottom-1">
        Booking Services
      </h1>
      <ContentBooking />
    </div>
  );
}

export default ListBookingServices;
