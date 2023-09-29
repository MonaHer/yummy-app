import { useGetAllMealsQuery } from "./apiSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { openModal, closeModal, setSelectedMealId } from "../modal/modalSlice";
import { toggleFavorite, selectFavorites } from "../favorites/favoritesSlice";
import { addToCart } from "../cart/cartSlice";

export default function MealsList() {
  const [isVisible, setIsVisible] = useState(3);
  const { data, isError, isLoading } = useGetAllMealsQuery();

  const { isOpen, selectedMealId } = useSelector((store) => store.modal);

  const favorites = useSelector(selectFavorites);

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

  function handleToggleFavorite(meal) {
    dispatch(toggleFavorite(meal.idMeal));
  }

  function handleAddToCart(meal) {
    dispatch(addToCart(meal));
  }

  const selectedMeal = data.meals.find(
    (meal) => meal.idMeal === selectedMealId
  );

  return (
    <>
      <h1>Meals</h1>
      <ul>
        {data.meals.slice(0, isVisible).map((meal) => (
          <li key={meal.idMeal}>
            <h2>{meal.strMeal}</h2>
            <p>Price: {meal.idMeal}€</p>
            <button onClick={() => handleToggleFavorite(meal)}>
              {favorites.includes(meal.idMeal) ? "💔" : "❤️"}
            </button>
            <button onClick={() => handleOpenInfo(meal)}>Show Info</button>
            {isOpen && (
              <Modal
                isOpen={isOpen}
                onRequestClose={() => dispatch(closeModal())}
                contentLabel="Info Modal"
              >
                <p>Info</p>
                <h3>{selectedMeal.strMeal}</h3>

                <img
                  alt={selectedMeal.strMeal}
                  src={selectedMeal.strMealThumb}
                />
                <p>{selectedMeal.strInstructions}</p>
                <button
                  onClick={() => {
                    dispatch(closeModal());
                  }}
                >
                  Close Info
                </button>
              </Modal>
            )}
            <button onClick={() => handleAddToCart(meal)}>Add to cart</button>
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
