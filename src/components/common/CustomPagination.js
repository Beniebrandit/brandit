import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import  Prevpaginateicon  from "../../asset/images/Prev_paginate_icon.svg";
import  Nextpaginateicon  from "../../asset/images/Next_paginate_icon.svg";

const CustomPagination = ({ totalItems = 0, itemsPerPage = 6, onPageChange }) => {
  // Ensure pageCount is a valid positive integer
  const pageCount = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);

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
      {[...Array(pageCount)].map((_, index) => {
        const page = index + 1;
        return (
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
        );
      })}
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
