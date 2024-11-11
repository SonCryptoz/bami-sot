import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search({ onSearch, placeholder }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("search")}>
                <input
                    placeholder={placeholder || "Search"}
                    spellCheck={false}
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button className={cx("search-btn")} onClick={handleSearchClick}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );
}

export default Search;
