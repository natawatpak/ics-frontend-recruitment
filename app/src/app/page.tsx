"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

//data
import places from "@/data/example_data.json";

import MenuBar from "@/components/MenuBar";

import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

// form
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  TextField,
  MenuItem,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";

// card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

// icons
import SearchIcon from "@mui/icons-material/Search";

import Link from "next/link";

const drawerWidth = 90;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

interface PlaceCardProps {
  data: Place;
}

const PlaceCard = (props: PlaceCardProps) => {
  return (
    <>
      <Card id={String(props.data.id)} sx={{ maxWidth: 400, height: 225 }}>
        <CardActionArea>
          <Link href={`/${props.data.name}`}>
            <CardContent>
              <Box sx={{ display: "flex", gap: "16px", pb: "11px" }}>
                <Box sx={{ display: "flex" }}>
                  <img
                    width="60px"
                    height="60px"
                    style={{ borderRadius: "10px" }}
                    srcSet={`${props.data.profile_image_url}?anchor=center&h=120&width=60&fit=crop&dpr=2 2x`}
                    src={`${props.data.profile_image_url}?anchor=center&h=120&width=60&fit=crop`}
                  ></img>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" component="div">
                      {props.data.name}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      {/* calendar icon */}
                      <Typography variant="body2" component="div">
                        {props.data.operation_time[0].time_open} -{" "}
                        {props.data.operation_time[0].time_close}
                      </Typography>
                    </div>
                    <div>
                      {/* Ratings point */}
                      <Typography variant="body1" component="div">
                        {props.data.rating}
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ overflow: "auto" }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 0, sm: 0, md: 0 }}
                >
                  {props.data.images.map((item) => (
                    <Box key={item} sx={{ display: "flex" }}>
                      <img
                        width="120px"
                        height="120px"
                        style={{ objectFit: "cover" }}
                        srcSet={`${item}?w=200&h=200&fit=crop&dpr=2 2x`}
                        src={`${item}?w=200&h=200&fit=crop`}
                        loading="lazy"
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </>
  );
};

export default function page() {
  const theme = useTheme();
  const [place, setPlace] = React.useState("1");

  const handleSearch = () => {
    // Search
    console.log("search");
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPlace(event.target.value as string);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MenuBar />
      {/* Page */}
      <Box component="main" sx={{ flexGrow: 1, pl: "calc(42px + 90px)" }}>
        <DrawerHeader />
        {/* search bar */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Place list</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl fullWidth sx={{ flexDirection: "row", gap: "10px" }}>
              <Select
                value={place}
                placeholder="Restaurant"
                onChange={handleChange}
              >
                <MenuItem value={1}>Restaurant</MenuItem>
                <MenuItem value={2}>Cafe</MenuItem>
                <MenuItem value={3}>Bakery</MenuItem>
              </Select>
              <TextField
                placeholder="Search Names..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>
        </Box>

        {/* Cards */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
          {places.map((place) => {
            return <PlaceCard data={place} />;
          })}
        </Box>

        {/* Pagination */}
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: "36px", sm: "36px", md: "36px" }}
            sx={{ mt: "53px", mb: "36px" }}
          >
            <Pagination
              count={1}
              variant="outlined"
              color="primary"
              size="large"
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
