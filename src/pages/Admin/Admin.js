import React, { useState } from "react";
import classNames from "classnames/bind";

import styles from "./Admin.module.scss";
import { items } from "./Items";
import Header from "@/layouts/components/Header";
import AdminMenu from "./AdminMenu";
import Footer from "@/layouts/components/Footer";
import AdminUser from "@/pages/Admin/AdminUser";
import AdminProduct from "@/pages/Admin/AdminProduct";

const cx = classNames.bind(styles);

function Admin() {
    const [keySelected, setKeySelected] = useState("1");

    const renderPage = (key) => {
        switch (key) {
            case "1":
                return <AdminUser />;
            case "2":
                return <AdminProduct />;
            default:
                return <div>Not Available</div>;
        }
    };

    const handleOnClick = (key) => {
        setKeySelected(key);
    };

    return (
        <div className={cx("wrapper")}>
            <Header isHiddenSearchBar isHiddenCart />
            <div className={cx("container")}>
                <AdminMenu items={items} onItemClick={handleOnClick} defaultSelectedKey={keySelected} />
                <div className={cx("data")}>{renderPage(keySelected)}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Admin;
