"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import MenuBar from "@/components/MenuBar";

import { useRouter } from "next/navigation";

interface Place {
  id: number;
  name: string;
  categories: Array<string>;
  profile_image_url: string;
  images: Array<string>;
  operation_time: Array<OperationTimeFormat>;
  address: string;
  rating: number;
}

interface OperationTimeFormat {
  day: string;
  time_open: string;
  time_close: string;
}

export default function page() {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MenuBar />
      {/* Page */}
      <Box
        component="main"
        sx={{ flexGrow: 1, pl: "calc(42px + 90px)", pt: "calc(64px + 28px)" }}
      >
        <Button
          variant="contained"
          onClick={() => {
            router.back();
          }}
        >
          {"< Back"}
        </Button>
      </Box>
    </Box>
  );
}
