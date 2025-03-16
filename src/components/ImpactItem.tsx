import React from "react";
import { Box, Typography } from "@mui/material";

interface ImpactItemProps {
  title: string;
  children: React.ReactNode;
}

const ImpactItem: React.FC<ImpactItemProps> = ({ title, children }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default ImpactItem;
