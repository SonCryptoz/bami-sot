import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faSort } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import styles from "./DataTable.module.scss";
import Button from "../Button";

const cx = classNames.bind(styles);

const DataTable = ({ data = [], columns = [], renderActions, handle = () => {}, onRow = () => {} }) => {
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
                } else if (key === "isAdmin") {
                    // So sánh với chuỗi "True" hoặc "False"
                    if (filters[key] === "True") {
                        return row[key] === "True";
                    } else if (filters[key] === "False") {
                        return row[key] === "False";
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

    const handleDeleteAll = () => {
        handle(selectedRows);
        setSelectedRows([]);
    };

    const exportToExcel = () => {
        // Loại bỏ các trường không mong muốn
        const sanitizedData = filteredData.map((row) => {
            return Object.fromEntries(
                Object.entries(row).filter(
                    ([key]) => !["_id", "password", "__v", "avatar", "image", "key"].includes(key),
                ),
            );
        });

        // Tạo worksheet từ dữ liệu
        const worksheet = XLSX.utils.json_to_sheet(sanitizedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Xuất file với định dạng .xlsx
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "data.xlsx");
    };

    return (
        <div>
            {selectedRows.length > 0 && (
                <div className={cx("btn-container")}>
                    <Button primary onClick={handleDeleteAll} className={cx("custom-deleteAll-btn")}>
                        Xóa tất cả
                    </Button>
                </div>
            )}
            <div className={cx("export-btn")}>
                <Button onClick={exportToExcel} primary>
                    Xuất sang Excel
                </Button>
            </div>
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
                                    <td key={col.key}>
                                        {col.key === "price"
                                            ? row[col.dataIndex].toLocaleString("vi-VN", {
                                                  style: "currency",
                                                  currency: "VND",
                                              })
                                            : row[col.dataIndex]}
                                    </td>
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
    handle: PropTypes.func,
    onRow: PropTypes.func,
};

export default DataTable;
