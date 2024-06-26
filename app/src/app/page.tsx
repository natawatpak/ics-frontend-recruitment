"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

//data
import places from "@/data/example_data.json";

import MenuBar from "@/components/MenuBar";
import RatingsDisplay from "@/components/RatingDisplay";

import Box from "@mui/material/Box";
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
  Divider,
} from "@mui/material";

// card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

// icons
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import Link from "next/link";

const drawerWidth = 90;

// the given data day start from Monday
const todayDay = new Date().getDay() + 1 > 6 ? 0 : new Date().getDay();

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
      <Card
        id={String(props.data.id)}
        sx={{
          maxWidth: { xs: "357px", sm: "357px", md: "400px" },
          height: { xs: "320px", sm: "320px", md: "225px" },
          borderRadius: "10px",
        }}
      >
        <CardActionArea>
          <Link
            href={`/${props.data.name}`}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => {
              localStorage.setItem("placeData", JSON.stringify(props.data));
            }}
          >
            <CardContent sx={{ padding: { xs: "0", sm: "0", md: "16px" } }}>
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: "6px", sm: "6px", md: "16px" },
                  width: { xs: "auto", sm: "auto", md: "100%" },
                  pb: { xs: "6px", sm: "6px", md: "11px" },
                  flexDirection: { xs: "column", sm: "column", md: "row" },
                }}
              >
                <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
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
                    width: "357px",
                    height: "87px",
                    overflow: "hidden",
                    resize: "both",
                    backgroundSize: "cover",
                    backgroundImage: `url(${props.data.profile_image_url}?anchor=center&width=357)`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "10px 10px 0px 0px",
                    display: { xs: "block", sm: "block", md: "none" },
                  }}
                ></Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "auto", sm: "auto", md: "100%" },
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant={"h6"} component="div">
                      {props.data.name}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <CalendarMonthIcon
                        sx={{
                          color: "black",
                          fontSize: { xs: "12px", sm: "12px", md: "20px" },
                          alignSelf: "flex-end",
                        }}
                      />
                      <Typography
                        variant="body2"
                        component="div"
                        color={"textblack"}
                        sx={{ alignSelf: "flex-end" }}
                      >
                        {props.data.operation_time[todayDay].time_open} -{" "}
                        {props.data.operation_time[todayDay].time_close}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                    >
                      <RatingsDisplay rating={props.data.rating} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ overflow: "yscroll" }}>
                <Stack
                  direction={"row"}
                  spacing={{ xs: 0, sm: 0, md: 0 }}
                  sx={{ overflow: "auto" }}
                >
                  {props.data.images.map((item) => (
                    <Box
                      key={item}
                      sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                    >
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

                  {props.data.images.map((item) => (
                    <Box
                      key={item}
                      sx={{
                        display: { xs: "block", sm: "block", md: "none" },
                        overflow: "auto",
                        minWidth: "320px",
                      }}
                    >
                      <img
                        width="320px"
                        height="176px"
                        style={{ objectFit: "cover" }}
                        srcSet={`${item}?w=300&h=300&fit=crop&dpr=2 2x`}
                        src={`${item}?w=300&h=300&fit=crop`}
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

const placesPerPage = 9;

const generatePageItems = (data: Array<Place>, pageNo: number) => {
  return data.slice(placesPerPage * (pageNo - 1), placesPerPage * pageNo);
};

const filterItems = (data: Array<Place>, filter: string, keyword: string) => {
  let filtered = data.filter((place) =>
    place.categories.find((catagory) => catagory === filter)
  );

  if (keyword) {
    return filtered.filter((place) => {
      const itemText = place.name.toLowerCase();
      return itemText.includes(keyword);
    });
  }

  return filtered;
};

export default function page() {
  const [filter, setFilter] = React.useState("restaurant");
  const [currentPage, setPage] = React.useState(1);
  const [keyword, setKeyword] = React.useState("");
  const [filteredPlaces, setFilteredPlaces] = React.useState<Array<Place>>([]);
  const [displayedPlaces, setDisplayedPlaces] = React.useState<Array<Place>>(
    []
  );

  React.useEffect(() => {
    setFilteredPlaces(filterItems(places, filter, keyword));
    setDisplayedPlaces(generatePageItems(filteredPlaces, currentPage));
  }, []);

  React.useEffect(() => {
    setDisplayedPlaces(generatePageItems(filteredPlaces, currentPage));
  }, [filteredPlaces]);

  const handleSearch = () => {
    setFilteredPlaces(filterItems(places, filter, keyword));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
    setFilteredPlaces(filterItems(places, event.target.value, ""));
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setDisplayedPlaces(generatePageItems(filteredPlaces, value));
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F5F6F8" }}>
      <MenuBar />
      {/* Page */}
      {/* search bar */}
      <Box
        sx={{
          position: "fixed",
          top: "60px",
          right: { xs: 0, sm: 0, md: "38px" },
          left: { xs: 0, sm: 0, md: "90px" },
          pl: { xs: "0px", sm: "0px", md: "42px" },
          bgcolor: "#F5F6F8",
          zIndex: 1,
          py: { xs: "0px", sm: "0px", md: "20px" },
          width: { xs: "100%", sm: "100%", md: "auto" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            alignItems: { xs: "left", sm: "left", md: "center" },
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={500}
            sx={{ py: { md: 0, sm: "10px", xs: "10px" } }}
          >
            Place list
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              width: { xs: "100%", sm: "100%", md: "auto" },
            }}
          >
            <FormControl
              sx={{
                flexDirection: { xs: "column", sm: "column", md: "row" },
                gap: "10px",
                width: { xs: "100%", sm: "100%", md: "auto" },
                pb: { md: 0, sm: "16px", xs: "16px" },
              }}
            >
              <Select
                value={filter}
                placeholder="Restaurant"
                onChange={handleChange}
                sx={{
                  borderRadius: "50px",
                  borderColor: "primary",
                  bgcolor: "white",
                  width: { xs: "100%", sm: "100%", md: "auto" },
                }}
              >
                <MenuItem value={"restaurant"}>Restaurant</MenuItem>
                <MenuItem value={"cafe"}>Cafe</MenuItem>
                <MenuItem value={"bakery"}>Bakery</MenuItem>
              </Select>

              <Divider orientation="vertical" sx={{ mx: "15px" }} />

              <TextField
                placeholder="Search Names..."
                onChange={(event) => {
                  setKeyword(event.target.value);
                }}
                InputProps={{
                  sx: {
                    borderRadius: "50px",
                    borderColor: "primary",
                    bgcolor: "white",
                    width: { xs: "100%", sm: "100%", md: "fit-content" },
                  },

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
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, pl: { xs: 0, sm: 0, md: "calc(42px + 90px)" } }}
      >
        <DrawerHeader />
        {/* Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            flexWrap: "wrap",
            alignContent: "center",
            gap: "18px",
            marginTop: { xs: "200px", sm: "200px", md: "90px" },
          }}
        >
          {displayedPlaces.map((place) => {
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
              onChange={onPageChange}
              count={
                Math.floor(displayedPlaces.values.length / placesPerPage) + 1
              }
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
