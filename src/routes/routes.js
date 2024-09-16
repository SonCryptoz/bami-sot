import config from "@/config";

// Layouts
//import { HeaderOnly } from "@/layouts";

// Pages
import Home from "@/pages/Home";
import Order from "@/pages/Order";
import Product from "@/pages/Product";
import PromotionProduct from "@/pages/Product/PromotionProduct";
import Introduction from "@/pages/Introduction";
import Contact from "@/pages/Contact";
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
        path: config.routes.product.promotionProduct,
        component: PromotionProduct,
    },
    {
        path: config.routes.introduction,
        component: Introduction,
    },
    {
        path: config.routes.contact,
        component: Contact,
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
