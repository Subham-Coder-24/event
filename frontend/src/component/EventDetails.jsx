import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "../style/eventDetails.css";
import location from "../assets/location.png";

import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import Loading from "./Loading";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [button, setButton] = useState(false);

  const navigate = useNavigate();

  const config = {
    headers: getAuthHeader(),
  };

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/events/${id}`,
        config
      );
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const handleBook = async () => {
    setButton(true);
    try {
      const bookingData = {
        eventId: id,
        quantity,
        // You may need to include additional user-related information here
      };

      const response = await axios.post(
        "http://localhost:4000/api/booking",
        bookingData,
        config
      );

      if (response.status === 201) {
        alert("Booking successful!");
        toast.success("Booking successful!"); // Show success toast
        setButton(false);
        navigate("/booking");
      } else {
        alert("Booking failed.");
      }
    } catch (error) {
      console.error("Error booking event:", error);
      alert("Booking failed.");
    }
  };

  if (!event) return <Loading/>;

  return (
    <div className="eventDetails">
      <ToastContainer className="toast_container" />
      <img src={event.img} alt="" />
      <div className="eventDetails_details">
        <h1>{event.name}</h1>
        <p className="eventDetails_details_des">{event.description}</p>
        <p className="eventDetails_details_location">
          <img
            src={location}
            alt=""
            style={{ height: "28px", width: "28px", marginRight: "1rem" }}
          />

          {event.location}
        </p>
        <div className="eventDetails_details_date">
          <div>
            <h3>Start</h3>
            <p>
              {new Date(event.date).toLocaleDateString(undefined, {
                // year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          <div>
            <h3>End</h3>
            <p>
              {new Date(event.endTime).toLocaleDateString(undefined, {
                // year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="eventDetails_details_Quantity">
          <p>Quantity</p>
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            className="custom-select"
          >
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>
                {n + 1}
              </option>
            ))}
          </select>
        </div>
        <p>${quantity * event.price}</p>
        <button
          disabled={button}
          className="custom-button"
          onClick={handleBook}
        >
          Book
        </button>
      </div>
    </div>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default EventDetails;
