import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import Footer from "../components/Footer";

export const DetailMeal = () => {
  const [meal, setMeal] = useState({});
  const [nutritionData, setNutritionData] = useState([]);
  const [attributeSums, setAttributeSums] = useState({});
  const [isLoading, setIsLoading] = useState(true); // State untuk menampilkan indikator loading
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
        setIsLoading(false); // Setelah data diperoleh, atur isLoading menjadi false
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Jika terjadi error, tetap atur isLoading menjadi false
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
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-blue-200 rounded-lg p-8 shadow-md">
            <div className="flex flex-col items-center">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-96 h-auto object-cover rounded-lg mb-8"
              />
              <h3 className="text-3xl font-bold text-center mb-4">{meal.strMeal}</h3>
              <h4 className="text-xl font-semibold mb-8">Attribute Sums:</h4>
              {isLoading ? (
                <div className="flex items-center justify-center w-full h-16">
                  <BarLoader color="#000000" />
                </div>
              ) : (
                <ul className="text-lg">
                  {Object.entries(attributeSums).map(([attribute, value]) =>
                    attribute === "name" ? null : (
                      <li key={attribute} className="mb-2">
                        <span className="capitalize">
                          {attribute
                            .split("_")
                            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                            .join(" ")}
                          :
                        </span>{" "}
                        {value.toFixed(1)}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};