import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    product_quantity: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity;
      //const newProduct = { ...action.payload.product, color: [...action.payload.color] };
      const newProduct = {
        ...action.payload.product,
        color: [action.payload.color],
        size: [action.payload.size],
      };
      //product_quantity = [...product_quantity, action.payload.quantity];
      state.product_quantity = [
        ...state.product_quantity,
        action.payload.quantity,
      ];

      state.products = [...state.products, newProduct];

      //.products.push(action.payload.product);

      state.total += action.payload.product.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
