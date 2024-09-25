import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./Sidebar.module.scss";
import AsideTitle from "@/components/AsideTitle";
import HeaderItem from "../Header/HeaderItem";
import { MENU_ITEM } from "../Header";

const cx = classNames.bind(styles);

function Sidebar({ title }) {
    return (
        <aside className={cx("wrapper")}>
            <div className={cx("category")}>
                <AsideTitle>{title}</AsideTitle>
                <div className={cx("content")}>
                    {MENU_ITEM.map((item, index) => {
                        return (
                            <div className={cx("item-content")}>
                                <HeaderItem title={item.title} to={item.to} key={index} />
                            </div>
                        );
                    })}
                </div>
                <AsideTitle>SẢN PHẨM BÁN CHẠY</AsideTitle>
                <div className={cx("content")}>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                </div>
                <AsideTitle>SẢN PHẨM KHUYẾN MẠI</AsideTitle>
                <div className={cx("content")}>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                    <div className={cx("item-product")}>
                        <div
                            className={cx("product-image")}
                            style={{
                                backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                            }}
                        ></div>
                        <div className={cx("product-shop")}>
                            <h3 className={cx("name")}>Pizza nhân bò phô mai</h3>
                            <span className={cx("special-price")}>340.000₫</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

Sidebar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Sidebar;
