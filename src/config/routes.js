const routes = {
    home: "/",
    order: "/order",
    cart: "/cart",
    product: {
        product: "/product",
        newProduct: "/product/new",
        promotionProduct: "/product/promotion",
        breadProduct: "/product/bread",
        cakeProduct: "/product/cake",
        softDrinkProduct: "/product/soft-drink",
    },
    productDetails: "/product-details/:id",
    introduction: "/introduction",
    contact: "/contact",
    profile: "/profile",
    login: "/login",
    register: "/register",
    admin: "/system/admin",
    pageNotFound: "*",
};

export default routes;
