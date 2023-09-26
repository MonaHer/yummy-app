import { useGetAllMealsQuery } from "./apiSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { openModal, closeModal, setSelectedMealId } from "../modal/modalSlice";

export default function MealsList() {
  const [isVisible, setIsVisible] = useState(3);
  const { data, isError, isLoading } = useGetAllMealsQuery();

  const { isOpen, selectedMealId } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  function showMoreMeals() {
    setIsVisible(isVisible + 3);
  }

  function showLessMeals() {
    setIsVisible(isVisible - 3);
  }

  function handleOpenInfo(meal) {
    dispatch(setSelectedMealId(meal.idMeal));
    dispatch(openModal());
  }

  return (
    <>
      <ul>
        {data.meals.slice(0, isVisible).map((meal) => (
          <li key={meal.idMeal}>
            <h2>{meal.strMeal}</h2>
            <button onClick={() => handleOpenInfo(meal)}>Show Info</button>
            {isOpen && (
              <Modal
                isOpen={isOpen}
                onRequestClose={() => dispatch(closeModal())}
                contentLabel="Info Modal"
              >
                <p>Info</p>
                <h3>
                  {
                    data.meals.find((meal) => meal.idMeal === selectedMealId)
                      ?.strMeal
                  }
                </h3>
                <img
                  alt={meal.strMeal}
                  src={
                    data.meals.find((meal) => meal.idMeal === selectedMealId)
                      ?.strMealThumb
                  }
                />
                <p>
                  {
                    data.meals.find((meal) => meal.idMeal === selectedMealId)
                      ?.strInstructions
                  }
                </p>
                <button
                  onClick={() => {
                    dispatch(closeModal());
                  }}
                >
                  Close Info
                </button>
              </Modal>
            )}
          </li>
        ))}
      </ul>
      <button onClick={showLessMeals} disabled={isVisible <= 3}>
        Show less meals
      </button>
      <button onClick={showMoreMeals} disabled={isVisible >= data.meals.length}>
        Show more meals
      </button>
    </>
  );
}
