import routes from "@/config/routes";
import * as ProductService from "@/services/ProductService";

// State và hàm lấy dữ liệu loại sản phẩm
let typeProducts = []; // Biến ngoài component để lưu trữ loại sản phẩm

const fetchAllTypesProduct = async () => {
    const res = await ProductService.getAllTypeProducts();
    if (res?.status === "success") {
        typeProducts = res?.data; // Cập nhật loại sản phẩm vào biến ngoài
    }
    return res;
};

// Hàm để tạo MENU_ITEM
export const createMenuItems = async () => {
    // Đảm bảo rằng dữ liệu đã được lấy về
    if (typeProducts.length === 0) {
        await fetchAllTypesProduct();
    }

    return [
        {
            title: "Sản phẩm mới",
            to: routes.product.newProduct,
        },
        {
            title: "Sản phẩm khuyến mãi",
            to: routes.product.promotionProduct,
            separate: true,
        },
        // Tạo các item từ loại sản phẩm
        ...typeProducts.map((item) => ({
            title: item,
            to: routes.productType.replace(":type", item),
        })),
    ];
};

createMenuItems().then((menuItems) => {
    MENU_ITEM = menuItems;
});

// MENU_ITEM sẽ được xuất ra để sử dụng ở nơi khác
export let MENU_ITEM = [];

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
