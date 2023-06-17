import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cartI')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // action will include any data inside of a payload
    // state is the current state of the reducer/cart
    addToCart: (state, action) => {
      // this item will be included in the payload
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      ); // O is the default value of acc.

      // calculate shipping price ( If order is oven 100$ then free, else 10$ shipping )
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);

      // calculate tax price (15% tax)
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );

      // calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // save the cart to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});
// export the actions
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
