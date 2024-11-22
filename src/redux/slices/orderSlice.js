import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: "",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: "",
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: "",
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state.orderItems.find((item) => item?.product === orderItem.product);
            if (itemOrder) {
                itemOrder.amount += orderItem.amount;
            } else {
                state.orderItems.push(orderItem);
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item?.product === idProduct);
            if (itemOrder) {
                itemOrder.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item?.product === idProduct);
            if (itemOrder && itemOrder.amount > 1) {
                itemOrder.amount--;
            }
        },
        updateAmount: (state, action) => {
            const { idProduct, amount } = action.payload;
            const itemOrder = state.orderItems.find((item) => item?.product === idProduct);
            if (itemOrder) {
                itemOrder.amount = amount;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter((item) => item?.product !== idProduct);
        },
        removeAllOrdersProduct: (state, action) => {
            const { cartChecked } = action.payload;
            state.orderItems = state.orderItems.filter((item) => !cartChecked.includes(item.product));
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    updateAmount,
    removeOrderProduct,
    removeAllOrdersProduct,
} = orderSlice.actions;

export default orderSlice.reducer;
