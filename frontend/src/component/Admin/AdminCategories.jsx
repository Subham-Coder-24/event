import { useState, useEffect } from "react";
import axios from "axios";
import "../../style/adminlayout.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
const config = {
  headers: getAuthHeader(),
};
const AdminCategories = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newName, setNewName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/events/categories",
        {
          name,
        },
        config
      );
      console.log(response);
      toast.success("Category created successfully!");
      setSuccess("Category created successfully!");
      setName(""); // Clear the input field
    } catch (error) {
      setError("Error creating category: " + error.message);
    }
  };
  useEffect(() => {
    // Fetch all categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/events/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find((cat) => cat.id === parseInt(categoryId));
    setSelectedCategory(category);
    setNewName(category ? category.name : "");
  };

  const handleUpdate = async () => {
    if (!selectedCategory) return;

    try {
      const response = await axios.put(
        `http://localhost:4000/api/events/categories/${selectedCategory.id}`,
        {
          name: newName,
        },
        config
      );

      if (response.status === 200) {
        toast.success("Category updated successfully!");
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === selectedCategory.id ? { ...cat, name: newName } : cat
          )
        );
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h1>Create New Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Category
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div>
        <h2>Update Category</h2>
        <div>
          <select
            onChange={handleCategoryChange}
            value={selectedCategory?.id || ""}
          >
            <option value="" disabled>
              Select a category to update
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {selectedCategory && (
          <div>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New category name"
            />
            <button onClick={handleUpdate}>Update Category</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
