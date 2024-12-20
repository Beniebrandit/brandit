import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Prevpaginateicon from "../../asset/images/Prev_paginate_icon.svg";
import Nextpaginateicon from "../../asset/images/Next_paginate_icon.svg";

const PopUpPagination = ({ totalItems = 0, itemsPerPage = 5, currentPages, onPageChange }) => {
  const pageCount = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handlePageClick = (page) => {
    onPageChange(page);
    console.log("page",page);
  };
    console.log("currentPages",currentPages);

  const handlePrevClick = () => {
    if (currentPages > 1) {
      handlePageClick(currentPages - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPages < pageCount) {
      handlePageClick(currentPages + 1);
    }
  };

  // Calculate visible pages
  const maxVisiblePages = 3;
  const startPage = Math.max(1, currentPages - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);
  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0px" }}>
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
        disabled={currentPages === 1}
      >
        <img
          style={{
            width: "14px",
          }}
          src={Prevpaginateicon}
        />
      </Button>
      {visiblePages.map((page) => (
        <Button
          key={page}
          onClick={() => handlePageClick(page)}
          sx={{
            margin: "0 5px",
            minWidth: "40px",
            height: "40px",
            backgroundColor: currentPages === page ? "#f2d388" : "#fff",
            color: "#3F5163",
            borderRadius: "8px",
            border: "1px solid #ddd",
            "&:hover": {
              backgroundColor: currentPages === page ? "#f2d388" : "#eee",
            },
          }}
        >
          {page}
        </Button>
      ))}
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
        disabled={currentPages === pageCount}
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

export default PopUpPagination;
