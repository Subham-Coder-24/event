import { useState, useEffect } from "react";
import axios from "axios";
import "../style/booking.css";
import booking from "../assets/booking.mp4";
import Loading from "./Loading";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log(bookings);
  const config = {
    headers: getAuthHeader(),
  };
  // Fetch bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async (page = 1) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/booking?page=${page}&limit=2`,
          config
        ); // Replace with your API endpoint
        setBookings(response.data.bookings);
        setTotalPages(response.data.totalPages); // Assuming the API returns totalPages
      } catch (error) {
        setError("Error fetching bookings");
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings(currentPage);
  }, [currentPage]);
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="booking">
      <h1>Bookings List</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="booking_content">
          <div className="booking_content_pagination">
            <ul className="booking-list">
              {bookings.map((booking) => (
                <li className="ok" key={booking.id}>
                  <div className="booking-item">
                    <img className="img2" src={booking.event.img} alt="" />
                    <div className="booking-item-text">
                      <p>Name: {booking.user.name}</p>
                      <p>Email: {booking.user.email}</p>
                      <p>Quantity: {booking.quantity}</p>
                      <p>Total: ${booking.total.toFixed(2)}</p>
                      <p>Event name: {booking.event.name}</p>
                      <p>Location: {booking.event.location}</p>
                      <p>
                        Start Time:{" "}
                        {new Date(booking.event.date).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p>
                        End Time:{" "}
                        {new Date(booking.event.endTime).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="confirmed">
                    <img
                      src="https://media.tenor.com/WsmiS-hUZkEAAAAj/verify.gif"
                      alt=""
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          <video width="600" autoPlay muted loop>
            <source src={booking} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default Booking;
