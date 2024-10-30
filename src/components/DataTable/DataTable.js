import React, { useState } from "react";
import classNames from "classnames/bind";
import { Divider } from "antd";

import styles from "./DataTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const data = [
    { key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park" },
    { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
    { key: "3", name: "Joe Black", age: 32, address: "Sydney No. 1 Lake Park" },
    { key: "4", name: "Disabled User", age: 99, address: "Sydney No. 1 Lake Park" },
];

const DataTable = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 2;

    const handleSelectRow = (key) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(key)
                ? prevSelected.filter((selectedKey) => selectedKey !== key)
                : [...prevSelected, key],
        );
    };

    const handleSelectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data.map((row) => row.key));
        }
    };

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div>
            <Divider />
            <div className={cx("table-container")}>
                <table className={cx("custom-table")}>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === data.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row) => (
                            <tr key={row.key} className={cx("data-table")}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(row.key)}
                                        onChange={() => handleSelectRow(row.key)}
                                    />
                                </td>
                                <td>{row.name}</td>
                                <td>{row.age}</td>
                                <td>{row.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={cx("pagination")}>
                    <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={cx("page")}>
                        <span>{currentPage}</span>
                    </div>
                    <button
                        onClick={() => handleChangePage(currentPage + 1)}
                        disabled={currentPage * rowsPerPage >= data.length}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
