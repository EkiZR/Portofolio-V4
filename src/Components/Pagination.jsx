/* import React from "react";
import { Box } from "@mui/material";

function Pagination({ totalPages, currentPage, handlePageChange }) {
  const dots = Array.from({ length: totalPages }, (_, i) => (
    <span
      key={i}
      onClick={() => handlePageChange(i)}
      className={`pagination-dot ${i === currentPage ? 'active' : ''}`}
    ></span>
  ));

  return <Box sx={{ display: "flex", justifyContent: "center" }}>{dots}</Box>;
}

export default Pagination;
 */