import "../style/home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import video from "../assets/vid.mp4";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import contact from "../assets/contact.png";
import { Link } from "react-router-dom";
import Loading from "./Loading";
const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(events);
  useEffect(() => {
    // fetchCategories();
    fetchEvents();
  }, []);


  const sliderSettings = {
    centerMode: true,
    centerPadding: "200px",
    // centerPadding: "320px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const images = [
    "https://assets-in.bmscdn.com/promotions/cms/creatives/1717080055549_playcardweb.jpg",
    "https://assets-in.bmscdn.com/promotions/cms/creatives/1722350498229_copyofwebshowcase1240x300.jpg",
    "https://assets-in.bmscdn.com/promotions/cms/creatives/1722923380734_utt2024webshowcase1240x300.jpg",
    "https://assets-in.bmscdn.com/promotions/cms/creatives/1722429978310_keyvisual1240x300wocta.jpg",
  ];
  const fetchEvents = async () => {
    try {
      const url = `http://localhost:4000/api/events`;
      const response = await axios.get(url);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="home">
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="slider_image"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="home_about">
        <video width="800" autoPlay muted loop>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="home_about_inner">
          <p className="home_text_heading">
            Seamless Event Booking at Your Fingertips
          </p>
          <p className="home_text_des">
            From finding the perfect event to booking your tickets, we make
            planning your next adventure easy and enjoyable. Explore a wide
            range of events and create unforgettable experiences with just a few
            clicks
          </p>
          <Link to="/events">
            <div className="home_book">
              <button>Book</button>
            </div>
          </Link>
        </div>
      </div>
      <div className="recommended">
        <h1>Recommended events</h1>
        <div className="recommended_events">
          {events.map((event) => (
            <div key={event.id}>
              <Link to={`/event/${event.id}`}>
                <img src={event.img} alt="" />
                <p className="bold">{event.name}</p>
                <p>{event.category.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="contact">
        <div className="contact_text">
          <div className="contact_text_heading">
            <p>Contact us</p>
            <img src={contact} alt="" />
          </div>

          <p>
            Our customer support team is ready to assist you with any inquiries
            or issues you might have. Please fill out the contact form below or
            use the provided contact details to get in touch. We aim to respond
            within 24 hours
          </p>
        </div>
        <div className="form">
          <p>Name</p>
          <div className="input_field">
            <input type="text" />
          </div>
          <p>Email</p>
          <div className="input_field">
            <input type="email" />
          </div>
          <p>Phone</p>
          <div className="input_field">
            <input type="tel" />
          </div>
          <button>Connect</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
