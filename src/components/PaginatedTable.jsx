import { useState } from "react";
import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

/**
 * PaginatedTable Component
 * 
 * Displays a paginated table of items based on the given data, rows, columns, and a render function.
 * 
 * @param {Array} data - The array of items to display.
 * @param {number} rows - The number of rows to display per page.
 * @param {number} columns - The number of columns to display per page.
 * @param {Function} renderItem - Function to render each individual item in the grid.
 */
const PaginatedTable = ({ data, rows, columns, renderItem }) => {
    const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentPage") || 0);
    const pageSize = columns * rows;

    return (
        <div className="bg-white shadow-lg rounded-lg p-2 w-full max-w-5xl h-[75vh] mt-2 flex flex-col">
            {
                Array.from({ length: rows }).map((_, row_index) => (
                    <div key={'row-' + row_index} className="flex-1 flex flex-row p-0 w-full">
                        {
                            Array.from({ length: columns }).map((_, column_index) => {
                                const currentIndex = (row_index * columns) + column_index + (pageSize * currentPage);
                                const currentItem = data[currentIndex];
                                return (
                                    <div key={'column ' + column_index} className="flex-1 flex m-1 items-center justify-center">
                                        {currentItem ? renderItem(currentItem) : <></>}
                                    </div>
                                );
                            })
                        }
                    </div>
                ))
            }

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
                {/* Previous Page */}
                <button
                    onClick={() => {
                        const newPage = Math.max(currentPage - 1, 0);
                        setCurrentPage(newPage);
                        localStorage.setItem("currentPage", newPage);
                    }}
                    disabled={currentPage === 0}
                    className={`text-2xl ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-gray-600"}`}
                >
                    <FaArrowLeft />
                </button>

                {/* Page Number */}
                <span className="text-lg font-semibold">
                    Page {Number(currentPage) + 1} of {Math.ceil(data.length / pageSize)}
                </span>

                {/* Next Page */}
                <button
                    onClick={() => {
                        const newPage = Math.min(currentPage + 1, Math.floor(data.length / pageSize));
                        setCurrentPage(newPage);
                        localStorage.setItem("currentPage", newPage);
                    }}
                    disabled={(currentPage + 1) * pageSize >= data.length}
                    className={`text-2xl ${(currentPage + 1) * pageSize >= data.length ? "opacity-50 cursor-not-allowed" : "hover:text-gray-600"}`}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

PaginatedTable.propTypes = {
    data: PropTypes.array.isRequired,
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
};

export default PaginatedTable;
