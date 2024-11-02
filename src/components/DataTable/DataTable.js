import React, { useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./DataTable.module.scss";

const cx = classNames.bind(styles);

const DataTable = ({ data = [], columns = [], renderActions }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleSelectRow = (key) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(key)
                ? prevSelected.filter((selectedKey) => selectedKey !== key)
                : [...prevSelected, key],
        );
    };

    const handleSelectAll = () => {
        setSelectedRows(selectedRows.length === data.length ? [] : data.map((row) => row.key));
    };

    const handleChangePage = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
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
                            {columns.map((col) => (
                                <th key={col.key}>{col.title}</th>
                            ))}
                            {renderActions && <th>Sửa-Xóa</th>}
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
                                {columns.map((col) => (
                                    <td key={col.key}>{row[col.dataIndex]}</td>
                                ))}
                                {renderActions && <td>{renderActions(row)}</td>}
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

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            dataIndex: PropTypes.string.isRequired,
        }),
    ),
    isPending: PropTypes.bool,
    renderActions: PropTypes.func,
};

export default DataTable;
