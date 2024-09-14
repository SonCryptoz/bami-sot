import config from "@/config";

// Layouts
//import { HeaderOnly } from "@/layouts";

// Pages
import Home from "@/pages/Home";
import Order from "@/pages/Order";
import Product from "@/pages/Product";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
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
        path: config.routes.product,
        component: Product,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: null,
    },
    {
        path: config.routes.search,
        component: Search,
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
