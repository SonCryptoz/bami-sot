import config from "@/config";

// Pages
import Home from "@/pages/Home";
import Order from "@/pages/Order";
import Product from "@/pages/Product";
import NewProduct from "@/pages/Product/NewProduct";
import BreadProduct from "@/pages/Product/BreadProduct";
import CakeProduct from "@/pages/Product/CakeProduct";
import SoftDrinkProduct from "@/pages/Product/SoftDrinkProduct";
import PromotionProduct from "@/pages/Product/PromotionProduct";
import ProductDetails from "@/pages/ProductDetails";
import Introduction from "@/pages/Introduction";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import PageNotFound from "@/pages/PageNotFound";

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.order,
        component: Order,
    },
    {
        path: config.routes.product.product,
        component: Product,
    },
    {
        path: config.routes.product.newProduct,
        component: NewProduct,
    },
    {
        path: config.routes.product.breadProduct,
        component: BreadProduct,
    },
    {
        path: config.routes.product.cakeProduct,
        component: CakeProduct,
    },
    {
        path: config.routes.product.softDrinkProduct,
        component: SoftDrinkProduct,
    },
    {
        path: config.routes.product.promotionProduct,
        component: PromotionProduct,
    },
    {
        path: config.routes.introduction,
        component: Introduction,
    },
    {
        path: config.routes.productDetails,
        component: ProductDetails,
        layout: null,
    },
    {
        path: config.routes.contact,
        component: Contact,
    },
    {
        path: config.routes.cart,
        component: Cart,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: null,
    },
    {
        path: config.routes.register,
        component: Register,
        layout: null,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: null,
    },
    {
        path: config.routes.pageNotFound,
        component: PageNotFound,
        layout: null,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
