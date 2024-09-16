import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import config from "@/config";
import styles from "./Header.module.scss";
import HeaderTop from "./HeaderTop";
import Search from "../Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import HeaderItem from "./HeaderItem";

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("set-background")}>
                <HeaderTop />
            </div>
            <header className={cx("inner")}>
                <div className={cx("menu-header")}>
                    <HeaderItem title="Trang chủ" to={config.routes.home} />
                    <HeaderItem title="Sản phẩm" to={config.routes.product.product} />
                    <HeaderItem title="Khuyến mãi" to={config.routes.product.promotionProduct} />
                    <HeaderItem title="Giới thiệu" to={config.routes.introduction} />
                    <HeaderItem title="Liên hệ" to={config.routes.contact} />
                </div>
                <div className={cx("right-header")}>
                    <Search />
                    <div className={cx("cart-account")}>
                        <FontAwesomeIcon icon={faShoppingBasket} className={cx("cart-icon")} />
                        <div className={cx("account")}>
                            <Link to={config.routes.home} className={cx("account-title")}>
                                Tài khoản
                            </Link>
                            <FontAwesomeIcon icon={faChevronDown} className={cx("down-account-icon")} />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
