import {
  Paper,
  List,
  ListItem,
  Divider,
  Typography,
  AppBar,
  Box,
  Toolbar,
  Avatar,
} from "@mui/material";

import Image from "next/image";

import NotificationsIcon from "@mui/icons-material/Notifications";

export default function MenuBar() {
  return (
    <>
    {/* sidebar */}
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          zIndex: "2",
          bgcolor: "white",
          width: "90px",
          height: "100%",
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          borderRadius: " 0px 50px 0px 0px",
        }}
      >
        <List>
          <ListItem>
            <Image src={"/logo.png"} alt="logo" width="54" height="54"></Image>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography width={"100%"} component="div">
              Place
            </Typography>
            <Divider />
          </ListItem>
        </List>
      </Paper>

      {/* top menubar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: "1",
          width: `100%`,
          height: `60px`,
          paddingLeft: `90px`,
          background: `#134B8A`,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <NotificationsIcon />
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography>Name Surname</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
