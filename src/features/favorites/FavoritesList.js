import { useSelector } from "react-redux";
import { selectFavorites } from "./favoritesSlice";
import { useGetAllMealsQuery } from "../meals/apiSlice";

export default function FavoritesList() {
  const { data, isError, isLoading } = useGetAllMealsQuery();

  const favorites = useSelector(selectFavorites);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const favoriteMeals = data.meals.filter((meal) =>
    favorites.includes(meal.idMeal)
  );
  return (
    <>
      <h2>Favorites</h2>
      <ul>
        {favoriteMeals.map((favorite) => (
          <li key={favorite.idMeal}>
            <p>{favorite.strMeal}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
