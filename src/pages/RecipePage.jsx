import React, { useState, useEffect } from "react";
import axios from "axios";
import CardCategory from "../components/CardCategory";
import Footer from "../components/Footer";

const RecipePage = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );

      setAllCategories(response.data.categories);
      console.log(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategories = allCategories.filter((category) =>
    category.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="bg__recipe"></div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3">
          {filteredCategories.map((item, index) => (
            <CardCategory key={item.idCategory} index={index + 1} data={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipePage;
