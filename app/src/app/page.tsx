"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

//data
import places from "@/data/example_data.json";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// Avatar & Noti
import Avatar from "@mui/material/Avatar";

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
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

// icons
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

const drawerWidth = 90;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

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
    <div id={String(props.data.id)}>
      <Card sx={{ maxWidth: 400, height: 225 }}>
        <CardContent>
          <CardActionArea sx={{ pb: "11px" }}>
            <Box sx={{ display: "flex", gap: "16px" }}>
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
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" component="div">
                    {props.data.name}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
          </CardActionArea>
          <Box sx={{ overflow: "auto" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 0, sm: 0, md: 1 }}
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
      </Card>
    </div>
  );
};

export default function page() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [place, setPlace] = React.useState("1");
  const test = "test";

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
      <Drawer
        variant="permanent"
        sx={{
          bgcolor: "black",
          width: "90px",
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            height: `60px`,
          }}
        >
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: "flex" }}
              >
                Mini variant drawer
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <NotificationsIcon />
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Typography>Name Surname</Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Place list</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl fullWidth sx={{ flexDirection: "row", gap: "10px" }}>
              <Select
                value={place}
                placeholder="Restuarant"
                onChange={handleChange}
              >
                <MenuItem value={1}>Restuarant</MenuItem>
                <MenuItem value={2}>Cafe</MenuItem>
                <MenuItem value={3}>Bakery</MenuItem>
              </Select>
              <TextField
                id="standard-textarea"
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "36px" }}>
          {places.map((place) => {
            return <PlaceCard data={place} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
