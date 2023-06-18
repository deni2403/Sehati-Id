import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

export const DetailMeal = () => {
  const [meal, setMeal] = useState({});
  const [nutritionData, setNutritionData] = useState([]);
  const [attributeSums, setAttributeSums] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const mealData = response.data.meals[0];
        setMeal(mealData);
        console.log(mealData);
        const ingredients = extractIngredients(mealData);
        const nutritionResults = await getNutritionData(ingredients);
        setNutritionData(nutritionResults);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeal();
  }, [id]);

  useEffect(() => {
    const calculateSums = () => {
      const sums = {};

      nutritionData.forEach((ingredientData) => {
        ingredientData.forEach((ingredient) => {
          Object.entries(ingredient).forEach(([attribute, value]) => {
            sums[attribute] = (sums[attribute] || 0) + value;
          });
        });
      });

      setAttributeSums(sums);
      console.log(sums);
    };

    calculateSums();
  }, [nutritionData]);

  const extractIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  const getNutritionData = async (ingredients) => {
    try {
      const requests = ingredients.map(async (ingredient) => {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(
            ingredient
          )}`,
          {
            headers: {
              "X-Api-Key": "8djk7jltsmLfQFIsLDjheQ==PAUgj10IZmpch8QT",
            },
          }
        );
        return response.data;
      });

      const results = await Promise.all(requests);

      // Handle the results here
      console.log(results);

      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <section>
        <div>
          <img src={meal.strMealThumb} alt="" />
          <h3>{meal.strMeal}</h3>
          <h4>Attribute Sums:</h4>
          <ul>
            {Object.entries(attributeSums).map(([attribute, value]) =>
              attribute === "name" ? null : (
                <li key={attribute}>
                  {attribute
                    .split("_")
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(" ")}
                  : {value}
                </li>
              )
            )}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
};
