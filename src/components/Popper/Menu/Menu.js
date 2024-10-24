import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Popover } from "antd";

import MenuItem from "./MenuItem";
import { Wrapper as PopperWrapper } from "@/components/Popper";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function Menu({ children, items = [], hideOnClick = false, ...passProps }) {
    const renderItems = () => {
        return items.map((item, index) => (
            <MenuItem key={index} data={item} /> // Thêm onClick để ẩn Tippy khi click
        ));
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
        <Popover {...passProps} placement="bottom" content={renderResult}>
            {children}
        </Popover>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
};

export default Menu;
