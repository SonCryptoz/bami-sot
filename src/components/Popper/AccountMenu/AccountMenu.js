import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import AccountItem from "./AccountItem";
import { Wrapper as PopperWrapper } from "@/components/Popper";
import styles from "./AccountMenu.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function AccountMenu({ children, items = [], hideOnClick = false, ...passProps }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return <AccountItem key={index} data={item} />;
        });
    };

    const renderResult = (attrs) => {
        return (
            <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx("menu-popper")}>
                    <div className={cx("menu-body")}>{renderItems()}</div>
                </PopperWrapper>
            </div>
        );
    };

    return (
        <Tippy
            {...passProps}
            interactive
            delay={[0, 200]}
            offset={[0, 10]}
            placement="bottom-end"
            render={renderResult}
        >
            {children}
        </Tippy>
    );
}

AccountMenu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
};

export default AccountMenu;
