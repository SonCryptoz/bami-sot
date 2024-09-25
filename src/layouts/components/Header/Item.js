import routes from "@/config/routes";

export const MENU_ITEM = [
    {
        title: "Sản phẩm mới",
        to: routes.product.newProduct,
    },
    {
        title: "Sản phẩm khuyến mãi",
        to: routes.product.promotionProduct,
        separate: true,
    },
    {
        title: "Bánh mỳ",
        to: routes.product.breadProduct,
    },
    {
        title: "Bánh ngọt",
        to: routes.product.cakeProduct,
    },
    {
        title: "Nước uống",
        to: routes.product.softDrinkProduct,
    },
];

export const ACCOUNT_ITEM = [
    {
        title: "Đăng nhập",
        to: routes.login,
        separate: true,
    },
    {
        title: "Đăng ký",
        to: routes.register,
    },
];
