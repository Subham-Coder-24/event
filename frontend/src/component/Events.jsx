import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/event.css";
import Loading from "./Loading";
const Events = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const [placeholder, setPlaceholder] = useState("Search events");
  const placeholders = [
    "Search events..",
    "What are you looking for..",
    "Get start with an event..",
  ];

  let index = 0;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/events/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async (category = null, searchTerm = "") => {
    try {
      const url = category
        ? `http://localhost:4000/api/events?category=${category}&search=${searchTerm}`
        : `http://localhost:4000/api/events?search=${searchTerm}`;
      const response = await axios.get(url);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, []);

  // Fetch events when selected category or search term changes
  useEffect(() => {
    fetchEvents(selectedCategory, searchTerm);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setPlaceholder(placeholders[index]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  if (loading) return <Loading />;

  return (
    <div className="event">
      <div className="event_header">
        <h3 className="colorful_text">All events</h3>
        {/* <ColorfulText text="All events" /> */}
        <div className="event_input">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {selectedCategory ? (
        <h2>Showing results of all {selectedCategory} events</h2>
      ) : (
        <h2>List of all Category</h2>
      )}
      <div className="event_category">
        {categories.map((category) => (
          <div
            onClick={() => handleCategoryClick(category.name)}
            key={category.id}
            className="event_category_button scale-on-hover"
          >
            <button>{category.name}</button>
          </div>
        ))}
      </div>
      <div className="event_listing">
        {events.length !== 0 ? (
          events.map((event) => (
            <div className="event_listing_items" key={event.id}>
              <img src={event.img} alt="" />
              <Link to={`/event/${event.id}`}>
                <div className="event_listing_content">
                  <h3>{event.name}</h3>
                  <p className="event_category">{event.category.name}</p>
                  <p className="event_location">
                    {event.location.slice(0, 20)}
                  </p>
                  <p className="event_price">${event.price}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
};

export default Events;
