import React, { useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import Prevpaginateicon from "../../asset/images/Prev_paginate_icon.svg";
import Nextpaginateicon from "../../asset/images/Next_paginate_icon.svg";

const CustomPagination = ({
  totalItems = 0,
  itemsPerPage = 6,
  onPageChange,
  maxPagesToShow = { xs: 2, sm: 3 },
}) => {
  const pageCount = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const pagesToShow = isSmallScreen ? maxPagesToShow.xs : maxPagesToShow.sm;

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageCount) {
      handlePageClick(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage > pageCount) {
      endPage = pageCount;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
      <Button
        sx={{
          margin: "0 5px",
          minWidth: "40px",
          height: "40px",
          color: "#000",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <img
          style={{
            width: "14px",
          }}
          src={Prevpaginateicon}
        />
      </Button>

      {pageNumbers[0] > 1 && (
        <>
          <Button
            onClick={() => handlePageClick(1)}
            sx={{
              margin: "0 5px",
              minWidth: "40px",
              height: "40px",
              backgroundColor: currentPage === 1 ? "#f2d388" : "#fff",
              color: "#3F5163",
              borderRadius: "8px",
              border: "1px solid #ddd",
              "&:hover": {
                backgroundColor: currentPage === 1 ? "#f2d388" : "#eee",
              },
            }}
          >
            1
          </Button>
          {pageNumbers[0] > 2 && <span style={{ margin: "0 5px" }}>...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <Button
          key={page}
          onClick={() => handlePageClick(page)}
          sx={{
            margin: "0 5px",
            minWidth: "40px",
            height: "40px",
            backgroundColor: currentPage === page ? "#f2d388" : "#fff",
            color: "#3F5163",
            borderRadius: "8px",
            border: "1px solid #ddd",
            "&:hover": {
              backgroundColor: currentPage === page ? "#f2d388" : "#eee",
            },
          }}
        >
          {page}
        </Button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < pageCount && (
        <>
          {pageNumbers[pageNumbers.length - 1] < pageCount - 1 && (
            <span style={{ margin: "0 5px" }}>...</span>
          )}
          <Button
            onClick={() => handlePageClick(pageCount)}
            sx={{
              margin: "0 5px",
              minWidth: "40px",
              height: "40px",
              backgroundColor: currentPage === pageCount ? "#f2d388" : "#fff",
              color: "#3F5163",
              borderRadius: "8px",
              border: "1px solid #ddd",
              "&:hover": {
                backgroundColor: currentPage === pageCount ? "#f2d388" : "#eee",
              },
            }}
          >
            {pageCount}
          </Button>
        </>
      )}

      <Button
        sx={{
          margin: "0 5px",
          minWidth: "40px",
          height: "40px",
          color: "#000",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
        onClick={handleNextClick}
        disabled={currentPage === pageCount}
      >
        <img
          src={Nextpaginateicon}
          style={{
            width: "14px",
          }}
        />
      </Button>
    </Box>
  );
};

export default CustomPagination;