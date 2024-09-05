// src/components/Pagination.js
"use client";

import { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = () => {
  const totalPages = 10; // Total number of pages
  const [currentPage, setCurrentPage] = useState(1); // Current active page

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Fetch or update data based on the new page here
  };

  const getPaginationItems = () => {
    const pageNumbers = [];
    const delta = 2; // Number of pages to show around the current page

    // Show page numbers before current page
    for (let i = Math.max(1, currentPage - delta); i < currentPage; i++) {
      pageNumbers.push(i);
    }

    // Show current page
    pageNumbers.push(currentPage);

    // Show page numbers after current page
    for (let i = currentPage + 1; i <= Math.min(totalPages, currentPage + delta); i++) {
      pageNumbers.push(i);
    }

    // Add leading ellipsis
    if (currentPage - delta > 2) {
      pageNumbers.unshift("...");
    }

    // Add trailing ellipsis
    if (currentPage + delta < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Add the first and last page
    if (pageNumbers[0] !== 1) {
      pageNumbers.unshift(1);
    }
    if (pageNumbers[pageNumbers.length - 1] !== totalPages) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.container}>
      {/* Pagination Section */}
      <div className={styles.pagination}>
        {getPaginationItems().map((item, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              item === currentPage ? styles.activePage : ""
            } ${item === "..." ? styles.ellipsis : ""}`}
            onClick={() => item !== "..." && handlePageClick(item)}
            disabled={item === "..."}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
