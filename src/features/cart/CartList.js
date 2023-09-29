import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "./cartSlice";

export default function CartList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart);

  function handleRemoveFromCart(meal) {
    dispatch(removeFromCart(meal));
  }

  /*function calculateTotalPrice() {
    return cartItems.reduce((total, meal) => total + meal.idMeal, 0);
  }*/

  function calculateTotalPrice() {
    return cartItems.reduce((total, meal) => total + parseInt(meal.idMeal), 0);
  }

  return (
    <>
      <h2>Shopping cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((meal) => (
            <li key={meal.idMeal}>
              {meal.strMeal}{" "}
              <button onClick={() => handleRemoveFromCart(meal)}>
                Remove from cart
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Price in total: {calculateTotalPrice()}</p>
    </>
  );
}
