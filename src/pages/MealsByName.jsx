import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CardMeal from "../components/CardMeal";
import Footer from "../components/Footer";

const MealsByName = () => {
  const { name } = useParams();
  const [mealsByName, setMealsByName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMealsByName = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
      );
      setMealsByName(response.data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMealsByName();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMeals = mealsByName.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg__recipe"></div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-3 md:gap-3">
        {filteredMeals.map((item, index) => (
          <CardMeal key={item.idMeal} index={index + 1} data={item} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MealsByName;
