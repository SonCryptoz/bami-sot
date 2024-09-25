import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import config from "@/config";
import styles from "./Header.module.scss";
import HeaderTop from "./HeaderTop";
import Search from "../Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import HeaderItem from "./HeaderItem";
import Menu from "@/components/Popper/Menu";
import AccountMenu from "@/components/Popper/AccountMenu";
import { MENU_ITEM, ACCOUNT_ITEM } from "./Item";
import { Badge } from "antd";

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
                    <Menu items={MENU_ITEM}>
                        <span style={{ lineHeight: "normal" }}>
                            <HeaderItem
                                title="Sản phẩm"
                                to={config.routes.product.product}
                                icon={<FontAwesomeIcon icon={faChevronDown} />}
                                end
                            />
                        </span>
                    </Menu>
                    <HeaderItem title="Khuyến mãi" to={config.routes.product.promotionProduct} />
                    <HeaderItem title="Giới thiệu" to={config.routes.introduction} />
                    <HeaderItem title="Liên hệ" to={config.routes.contact} />
                </div>
                <div className={cx("right-header")}>
                    <Search />
                    <div className={cx("cart-account")}>
                        <Link to={config.routes.cart}>
                            <Badge count={4} size="small" color="var(--primary)">
                                <FontAwesomeIcon icon={faShoppingBasket} className={cx("cart-icon")} />
                            </Badge>
                        </Link>
                        <AccountMenu items={ACCOUNT_ITEM}>
                            <div className={cx("account")}>
                                <span className={cx("account-title")}>Tài khoản</span>
                                <span className={cx("down-account-icon")}>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </span>
                            </div>
                        </AccountMenu>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
