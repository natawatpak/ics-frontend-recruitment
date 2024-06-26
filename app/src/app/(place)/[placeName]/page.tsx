"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, ImageList, ImageListItem } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import MenuBar from "@/components/MenuBar";
import RatingsDisplay from "@/components/RatingDisplay";

import { useRouter } from "next/navigation";
import { Place } from "@mui/icons-material";

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

const OperationTimes = ({
  operationTimes,
}: {
  operationTimes: Array<OperationTimeFormat>;
}) => {
  console.log(operationTimes);
  return operationTimes.map((operationTime) => {
    return operationTime.time_open === "closed" ? (
      <>
        {operationTime.day}: {operationTime.time_open} <br />
      </>
    ) : (
      <>
        {operationTime.day}: {operationTime.time_open} -
        {operationTime.time_close} <br />
      </>
    );
  });
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function page() {
  const router = useRouter();
  const placeData: Place = JSON.parse(
    localStorage.getItem("placeData") || "{}"
  );

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MenuBar />

      {/* LabTop screen */}
      {/* Page */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: { xs: "0px", sm: "0px", md: "calc(42px + 90px)" },
          pt: { xs: "64px", sm: "64px", md: "calc(64px + 28px)" },
          pr: { xs: "0px", sm: "0px", md: "24px" },
        }}
      >
        <Button
          variant="contained"
          sx={{ mb: { xs: "10px", sm: "10px", md: "30px" } }}
          onClick={() => {
            router.back();
          }}
        >
          {"< Back"}
        </Button>

        <Box
          sx={{
            background: "#C4D3E9",
            borderRadius: "10px",
            padding: "30px",
            maxWidth: "1240px",
            display: { xs: "none", sm: "none", md: "flex" },
          }}
        >
          {/* Details */}
          <Box
            sx={{
              background: "white",
              borderRadius: "10px",
              width: "50%",
              maxWidth: "720px",
            }}
          >
            <Box
              sx={{
                height: "400px",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${placeData.profile_image_url})`,
                borderRadius: "10px 10px 0px 0px",
              }}
            ></Box>
            <Box sx={{ padding: " 0px 24px 57px 43px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "24px",
                }}
              >
                <Typography variant="h6">{placeData.name}</Typography>
                <RatingsDisplay rating={placeData.rating} />
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="body1"
                  width={"113px"}
                  sx={{ minWidth: "113px" }}
                >
                  Adress:
                </Typography>
                <Typography>{placeData.address}</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="body1"
                  width={"113px"}
                  sx={{ minWidth: "113px" }}
                >
                  Opening Hour:
                </Typography>
                <OperationTimes operationTimes={placeData.operation_time} />
              </Box>
            </Box>
          </Box>

          {/* Images */}
          <Box
            sx={{
              background: "white",
              borderRadius: "10px",
              maxWidth: "550px",
              ml: "2%",
              width: "48%",
              px: "35px",
              pt: "20px",
              pb: "40px",
            }}
          >
            <Typography variant="h6">Images</Typography>

            <ImageList
              sx={{ width: 480, height: "auto" }}
              cols={1}
              rowHeight={320}
            >
              {placeData.images.map((img) => (
                <ImageListItem key={img}>
                  <img
                    srcSet={`${img}?w=480&h=480&fit=crop&auto=format&dpr=2 2x`}
                    src={`${img}?w=480&h=480&fit=crop&auto=format`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>

        {/* Mobile screen */}

        <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { display: "none" },
              }}
              aria-label="basic tabs example"
              sx={{
                border: 0,
              }}
              centered
            >
              <Tab
                label="Information"
                sx={{
                  borderRadius: "50px",
                  bgcolor: value === 0 ? "primary.main" : "white",
                  ".Mui-selected": {
                    color: `white`,
                  },
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="Image"
                sx={{
                  borderRadius: "50px",
                  bgcolor: value === 1 ? "primary.main" : "white",
                }}
                {...a11yProps(1)}
              />
            </Tabs>

            <CustomTabPanel value={value} index={0}>
              {/* Details */}
              <Box
                sx={{
                  background: "white",
                  borderRadius: "10px",
                  maxWidth: "100%",
                  boxShadow: 3,
                }}
              >
                <Box
                  sx={{
                    height: "400px",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${placeData.profile_image_url})`,
                    borderRadius: "10px 10px 0px 0px",
                  }}
                ></Box>
                <Box sx={{ padding: " 0px 24px 57px 43px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: "24px",
                      mb: "13px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "20px !important" }}
                    >
                      {placeData.name}
                    </Typography>
                    <RatingsDisplay rating={placeData.rating} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mb: "30px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      width={"113px"}
                      sx={{ minWidth: "113px" }}
                    >
                      Adress:
                    </Typography>
                    <Typography>{placeData.address}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="body1"
                      width={"113px"}
                      sx={{ minWidth: "113px" }}
                    >
                      Opening Hour:
                    </Typography>
                    <OperationTimes operationTimes={placeData.operation_time} />
                  </Box>
                </Box>
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              {/* Images */}
              <Box
                sx={{
                  background: "white",
                  borderRadius: "10px",
                  maxWidth: "100%",
                  ml: "2%",
                  px: "35px",
                  pt: "20px",
                  pb: "40px",
                  boxShadow: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "20px !important" }}>
                  Images
                </Typography>

                <ImageList
                  sx={{ width: 480, height: "auto" }}
                  cols={1}
                  rowHeight={320}
                >
                  {placeData.images.map((img) => (
                    <ImageListItem key={img}>
                      <img
                        srcSet={`${img}?w=480&h=480&fit=crop&auto=format&dpr=2 2x`}
                        src={`${img}?w=480&h=480&fit=crop&auto=format`}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
