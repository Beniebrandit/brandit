import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BreadcrumbSection(props) {
  return (
    <Box role="presentation">
      <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "1rem", color: "rgb(63, 81, 99)" }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="none" color="inherit" href="">
          {props?.productName}
        </Link>
        {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
      </Breadcrumbs>
    </Box>
  );
}
