import React, { useState } from "react";
import classNames from "classnames/bind";

import styles from "./Admin.module.scss";
import { items } from "./Items";
import Header from "@/layouts/components/Header";
import AdminMenu from "./AdminMenu";
import Footer from "@/layouts/components/Footer";

const cx = classNames.bind(styles);

function Admin() {
    const [keySelected, setKeySelected] = useState("");

    const handleOnClick = (key) => {
        setKeySelected(key);
    };

    return (
        <div className={cx("wrapper")}>
            <Header isHiddenSearchBar isHiddenCart />
            <div className={cx("container")}>
                <AdminMenu items={items} onItemClick={handleOnClick} />
                <div className={cx("data")}>{keySelected === "2" && <span>Key is 2</span>}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Admin;
