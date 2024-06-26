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
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { text } from "stream/consumers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function MenuBar() {
  return (
    <>
      {/* sidebar */}
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          zIndex: "3",
          bgcolor: "white",
          width: "90px",
          height: "100%",
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          borderRadius: " 0px 50px 0px 0px",
          display: { md: "block", sm: "none", xs: "none" },
        }}
      >
        <Image
          src={"/logo.png"}
          alt="logo"
          width="54"
          height="54"
          style={{ margin: "25px 20px 0px 17px " }}
        ></Image>

        <Divider sx={{ my: "18px" }} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: "26px" }}>
          <Box
            sx={{
              width: "38px",
              height: "38px",
              display: "flex",
              margin: "1px",
              padding: "1px",
              borderRadius: "10px",
              bgcolor: "#0F1E56",
              overflow: "visible",
            }}
          >
            <FormatListBulletedIcon
              fontSize="small"
              sx={{
                background: "#0F1E56;",
                color: "white",
                padding: "0.5px",
                borderRadius: "2px",
                border: "white solid 1.5px",
                margin: "8px",
              }}
            ></FormatListBulletedIcon>
          </Box>
        </Box>

        <Typography
          variant="caption"
          width={"100%"}
          textAlign={"center"}
          component="div"
        >
          Place
        </Typography>
        <Divider sx={{ my: "18px" }} />
      </Paper>

      {/* top menubar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: "2",
          width: `100%`,
          height: `60px`,
          paddingLeft: { xs: `0`, sm: `0`, md: `90px` },
          background: `#134B8A`,
        }}
      >
        <Toolbar sx={{ pl: { xs: 0, sm: 0, md: "24px" } }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: {
                xs: "space-between",
                sm: "space-between",
                md: "end",
              },
            }}
          >
            <Box
              component={"img"}
              src={"/logo.png"}
              alt="logo"
              sx={{
                display: { sm: "flex", md: "none" },
                borderRadius: "10px",
                width: "50px",
                height: "50px",
              }}
            ></Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <NotificationsIcon
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              />
              <Avatar alt="Remy Sharp" />
              <Typography
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                Name Surname
              </Typography>
              <KeyboardArrowDownIcon
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
