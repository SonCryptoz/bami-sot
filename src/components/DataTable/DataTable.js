import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faSort } from "@fortawesome/free-solid-svg-icons";

import styles from "./DataTable.module.scss";

const cx = classNames.bind(styles);

const DataTable = ({ data = [], columns = [], renderActions, onRow = () => {} }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [filters, setFilters] = useState({});

    const rowsPerPage = 5;

    // Lọc dữ liệu
    const filteredData = useMemo(() => {
        return data.filter((row) => {
            return Object.keys(filters).every((key) => {
                if (!filters[key]) return true; // Không có bộ lọc thì hiển thị tất cả

                if (key === "quantity") {
                    // Lọc dữ liệu theo số lượng
                    if (filters[key] === "under50") {
                        return row[key] < 50; // Dưới 50
                    } else if (filters[key] === "over50") {
                        return row[key] >= 50; // Trên 50
                    }
                }

                // Các cột khác nếu có bộ lọc khác
                return row[key] === filters[key];
            });
        });
    }, [data, filters]);

    // Sắp xếp dữ liệu đã lọc
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData; // Nếu không có cấu hình sắp xếp, trả về dữ liệu đã lọc

        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Chọn dữ liệu cho trang hiện tại sau khi đã lọc và sắp xếp
    const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

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
                                <th key={col.key}>
                                    <span onClick={() => handleSort(col.dataIndex)}>
                                        {col.title} <FontAwesomeIcon icon={faSort} className={cx("sort")} />
                                    </span>
                                    <span style={{ marginLeft: "10px", display: "inline-flex", alignItems: "center" }}>
                                        {col.filters && (
                                            <select
                                                onChange={(e) =>
                                                    setFilters({ ...filters, [col.dataIndex]: e.target.value })
                                                }
                                                className={cx("option-filter")}
                                            >
                                                <option value="">Tất cả</option>
                                                {col.filters.map((filter) => (
                                                    <option key={filter.value} value={filter.value}>
                                                        {filter.text}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </span>
                                </th>
                            ))}
                            {renderActions && <th>Thao tác</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <tr key={row.key} onClick={(e) => onRow(row, rowIndex)?.onClick?.(e)}>
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
    onRow: PropTypes.func,
};

export default DataTable;
