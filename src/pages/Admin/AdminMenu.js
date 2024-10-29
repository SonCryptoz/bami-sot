import React, { useState } from "react";
import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "./AdminMenu.module.scss";

const cx = classNames.bind(styles);

function AdminMenu({ items, onItemClick }) {
    const [selectedKey, setSelectedKey] = useState(null);

    const handleClick = (key) => {
        setSelectedKey(key);
        if (onItemClick) {
            onItemClick(key);
        }
    };

    return (
        <div className={cx("menu")}>
            <ul className={cx("menu-list")}>
                {items.map((item) => (
                    <li
                        key={item.key}
                        className={cx("menu-item", { selected: selectedKey === item.key })}
                        onClick={() => handleClick(item.key)}
                    >
                        {item.icon && <span className={cx("menu-icon")}>{item.icon}</span>}
                        <span className={cx("menu-title")}>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

AdminMenu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onItemClick: PropTypes.func.isRequired,
};

export default AdminMenu;
