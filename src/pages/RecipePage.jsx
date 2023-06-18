import React, { useState, useEffect } from "react";
import axios from "axios";
import Example from "../assets/example.png";
import CardCategory from "../components/CardCategory";
import Footer from "../components/Footer";

const RecipePage = () => {
  const [allCategories, setAllCategories] = useState([]);

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
  return (
    <>
      <div className="bg__recipe"></div>
      <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-3 md:gap-3">
        {allCategories.map((item, index) => (
          <CardCategory index={index + 1} data={item} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default RecipePage;
