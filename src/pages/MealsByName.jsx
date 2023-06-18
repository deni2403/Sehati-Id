import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CardMeal from "../components/CardMeal";
import Footer from "../components/Footer";

const MealsByName = () => {
  const { name } = useParams();
  const [mealsByName, setMealsByName] = useState([]);

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
  return (
    <>
      <div className="bg__recipe"></div>
      <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-3 md:gap-3">
        {mealsByName.map((item, index) => (
          <CardMeal index={index + 1} data={item} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MealsByName;
