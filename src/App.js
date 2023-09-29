import MealsList from "./features/meals/MealsList";
import FavoritesList from "./features/favorites/FavoritesList";
import CartList from "./features/cart/CartList";

export default function App() {
  return (
    <div>
      <MealsList />
      <FavoritesList />
      <CartList />
    </div>
  );
}
