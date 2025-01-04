import { createSlice } from "@reduxjs/toolkit";

// Load initial cart state from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users")) || []; // Assuming you have a users array in localStorage
const storedCart = currentUser
    ? users.find((user) => user.username === currentUser.username)?.cartDetails?.cart || {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
    }
    : JSON.parse(localStorage.getItem("tempCart")) || {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
    };

// Function to save cart to localStorage
const saveCartToLocalStorage = (state, isLoggedIn) => {
    if (isLoggedIn) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (currentUser) {
            // Find the user and update their cartDetails
            const userIndex = users.findIndex((user) => user.username === currentUser.username);
            if (userIndex !== -1) {
                users[userIndex].cartDetails = { cart: state }; // Save unique cart details
                localStorage.setItem("users", JSON.stringify(users)); // Save updated users back to localStorage
            }
        }
    } else {
        // If not logged in, save to tempCart
        localStorage.setItem("tempCart", JSON.stringify(state));
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: storedCart,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.products.find((item) => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.products.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: parseFloat(newItem.price),
                    quantity: 1,
                    image: newItem.image,
                    description: newItem.description,
                });
            }

            // Update totals
            state.totalPrice = state.products.reduce((total, item) => total + item.price * item.quantity, 0);
            state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);

            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            saveCartToLocalStorage(state, !!currentUser);
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.products.find((item) => item.id === id);
        
            if (existingItem) {
                state.products = state.products.filter((item) => item.id !== id);
                // Update totals
                state.totalPrice = state.products.reduce((total, item) => total + item.price * item.quantity, 0);
                state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);
        
                // Save the updated cart to localStorage
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                if (currentUser) {
                    // User is logged in, save to users
                    saveCartToLocalStorage(state, true);
                } else {
                    // User is logged out, save to tempCart
                    localStorage.setItem("tempCart", JSON.stringify(state));
                }
            }
        },        
        updateCartQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.products.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity = quantity;
                if (existingItem.quantity <= 0) {
                    state.products = state.products.filter(item => item.id !== id);
                }
                // Update totals
                state.totalPrice = state.products.reduce((total, item) => total + item.price * item.quantity, 0);
                state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);
            }

            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            saveCartToLocalStorage(state, !!currentUser);
        },
        hydrateCart(state, action) {
            return action.payload; // Replace the current state with the localStorage data
        },
        clearCart(state) {
            state.products = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;

            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const users = JSON.parse(localStorage.getItem("users")) || [];
            if (currentUser) {
                // If the user is logged in, clear their cart in the users object
                const userIndex = users.findIndex((user) => user.username === currentUser.username);
                if (userIndex !== -1) {
                    users[userIndex].cartDetails = { cart: { products: [], totalQuantity: 0, totalPrice: 0 } };
                    localStorage.setItem("users", JSON.stringify(users));
                }
            } else {
                // Clear tempCart if the user is not logged in
                localStorage.setItem("tempCart", JSON.stringify({ products: [], totalQuantity: 0, totalPrice: 0 }));
            }
        },
    },
});

// Export selectors
export const selectCartItems = (state) => state.cart.products;
export const selectTotalAmount = (state) => state.cart.totalPrice;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;

export const { 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;