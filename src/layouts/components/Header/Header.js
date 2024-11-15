import classNames from "classnames/bind";
import { Badge, Popover } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Search from "../../../components/Search";
import config from "@/config";
import styles from "./Header.module.scss";
import HeaderTop from "./HeaderTop";
import HeaderItem from "./HeaderItem";
import Menu from "@/components/Popper/Menu";
import AccountMenu from "@/components/Popper/AccountMenu";
import { MENU_ITEM, ACCOUNT_ITEM } from "./Item";
import * as UserService from "@/services/UserService";
import { resetUser } from "@/redux/slices/userSlice";
import { searchProduct } from "@/redux/slices/productSlice";
import { useState } from "react";
import Loading from "@/components/Loading";

const cx = classNames.bind(styles);

function Header({ isHiddenSearchBar = false, isHiddenCart = false }) {
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line
    const [searchTerm, setSearchTerm] = useState("");

    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };

    const dispatch = useDispatch();
    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        localStorage.removeItem("access_token");
        dispatch(resetUser());
        navigate("/");
        setLoading(false);
    };

    const content = (
        <div className={cx("content-user")}>
            <p
                onClick={() => {
                    navigate("/profile");
                }}
            >
                Thông tin người dùng
            </p>
            {user?.isAdmin && (
                <p
                    onClick={() => {
                        navigate("/system/admin");
                    }}
                >
                    Quản lý hệ thống
                </p>
            )}
            <p onClick={handleLogout}>Đăng xuất</p>
        </div>
    );

    const handleSearch = (term) => {
        setSearchTerm(term);
        dispatch(searchProduct(term));
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("set-background")}>
                <HeaderTop />
            </div>
            <header className={cx("inner")}>
                <div className={cx("menu-header")}>
                    <div>
                        <HeaderItem title="Trang chủ" to={config.routes.home} />
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <HeaderItem title="Khuyến mãi" to={config.routes.product.promotionProduct} />
                    </div>
                    <div>
                        <HeaderItem title="Giới thiệu" to={config.routes.introduction} />
                    </div>
                    <div>
                        <HeaderItem title="Liên hệ" to={config.routes.contact} />
                    </div>
                </div>
                <div className={cx("right-header")}>
                    {!isHiddenSearchBar && (
                        <Search onSearch={handleSearch} placeholder="Tìm kiếm bánh mỳ, đồ uóng..." />
                    )}
                    <div className={cx("cart-account")}>
                        {!isHiddenCart && (
                            <Link to={config.routes.cart}>
                                <Badge count={4} size="small" color="var(--primary)">
                                    <FontAwesomeIcon icon={faShoppingBasket} className={cx("cart-icon")} />
                                </Badge>
                            </Link>
                        )}
                        {user?.name ? (
                            <div style={{ marginLeft: "20px" }}>
                                <Loading isPending={loading}>
                                    <Popover placement="bottom" content={content}>
                                        <div className={cx("username")}>{user.name}</div>
                                    </Popover>
                                </Loading>
                            </div>
                        ) : (
                            <div>
                                <AccountMenu items={ACCOUNT_ITEM}>
                                    <div className={cx("account")}>
                                        <span className={cx("account-title")} onClick={handleLogin}>
                                            Tài khoản
                                        </span>
                                        <span className={cx("down-account-icon")}>
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </span>
                                    </div>
                                </AccountMenu>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
