import { createStore } from "@reduxjs/toolkit";

const cartReducer = (state: any = { cart: [] }, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};

const store = createStore(cartReducer);
