import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("search")}>
                <input placeholder="Tìm kiếm bánh mỳ, đồ uống..." spellCheck={false} />

                <button className={cx("search-btn")}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );
}

export default Search;
