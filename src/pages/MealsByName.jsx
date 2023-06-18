import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
      <Footer />
    </>
  );
};

export default MealsByName;
