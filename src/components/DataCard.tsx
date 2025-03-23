import React from "react";
import { Paper, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

interface DataCardProps {
  title: string;
  linkText: string;
  linkHref: string;
  isDark?: boolean;
  children: React.ReactNode;
}

// Define styles at the top level for Pigment CSS static analysis
const darkCardSx = {
  backgroundColor: "var(--palette-primary-main)",
  color: "var(--palette-common-white)",
  padding: "2rem",
  borderRadius: "8px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const lightCardSx = {
  backgroundColor: "var(--palette-grey-100)",
  color: "inherit",
  padding: "2rem",
  borderRadius: "8px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const darkLinkStyle = {
  color: "var(--palette-common-white)",
  display: "inline-flex",
  alignItems: "center",
  marginTop: "auto",
  paddingTop: "1rem",
  textDecoration: "none",
};

const lightLinkStyle = {
  color: "var(--palette-primary-main)",
  display: "inline-flex",
  alignItems: "center",
  marginTop: "auto",
  paddingTop: "1rem",
  textDecoration: "none",
};

const DataCard: React.FC<DataCardProps> = ({
  title,
  linkText,
  linkHref,
  isDark = false,
  children,
}) => {
  return (
    <Paper sx={isDark ? darkCardSx : lightCardSx} elevation={0}>
      <Typography variant="h5" component="h3" gutterBottom>
        {title}
      </Typography>
      {children}
      <Link href={linkHref} passHref>
        <MuiLink sx={isDark ? darkLinkStyle : lightLinkStyle}>
          → {linkText}
        </MuiLink>
      </Link>
    </Paper>
  );
};

export default DataCard;
