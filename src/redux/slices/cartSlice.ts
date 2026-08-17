import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  count: number;
  items: CartItem[];
}

const initialState: CartState = {
  count: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.count = action.payload.reduce((sum, item) => sum + item.quantity, 0);
    },
    clearCart: (state) => {
      state.count = 0;
      state.items = [];
    },
  },
});

export const { setCartCount, setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
