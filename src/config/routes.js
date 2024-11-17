const routes = {
    home: "/",
    order: "/order",
    cart: "/cart",
    product: {
        product: "/san_pham",
        newProduct: "/san_pham/moi",
        promotionProduct: "/san_pham/khuyen_mai",
    },
    productType: "/san_pham/:type",
    productDetails: "/chi_tiet_san_pham/:id",
    introduction: "/gioi_thieu",
    contact: "/lien_he",
    profile: "/profile",
    login: "/login",
    register: "/register",
    admin: "/system/admin",
    pageNotFound: "*",
};

export default routes;
