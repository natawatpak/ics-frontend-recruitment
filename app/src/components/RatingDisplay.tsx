import { Typography, Box } from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function RatingsDisplay({ rating }: { rating: number }) {
  return (
    <Box sx={{ display: "flex", alignContent: "center" }}>
      <FiberManualRecordIcon
        color="primary"
        sx={{ fontSize: "11px", alignSelf: "center" }}
      />
      <Typography variant="body1" color="primary" sx={{ alignSelf: "center" }}>
        {rating}
      </Typography>
    </Box>
  );
}
