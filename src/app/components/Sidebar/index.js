"use client";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MonitorIcon from "@mui/icons-material/Monitor";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useState } from "react";
import { Grid, Paper, Slide } from "@mui/material";
import { ThemeButton } from "../ThemeButton";
import { Dashboard, Height } from "@mui/icons-material";
import { HighChart, LinePlot } from "../ChartLibs/Highcharts/Line/LinePlot";
import ScatterPlot, { LineSD } from "../ChartLibs/Highcharts/Line/LineSD";
import { HighStock } from "../ChartLibs/Highcharts/Line/HighStock";
import {
  LineMark,
  MarkxAxis,
} from "../ChartLibs/Highcharts/Line/LineMark/MarkxAxis";
import { MarkyAxis } from "../ChartLibs/Highcharts/Line/LineMark/MarkyAxis";
import { LineScale } from "../ChartLibs/Highcharts/Line/LineScale";
import { Scatter } from "../ChartLibs/Highcharts/Scatter";
import { Waterfall } from "../ChartLibs/Highcharts/Bar/Waterfall";
import { BezierCurve } from "../ChartLibs/Highcharts/Line/BezierCurve";
import { NivoLinePlot } from "../ChartLibs/nivo/Line/LinePlot";
import { D3Scatter } from "../ChartLibs/D3/Scatter";
import { DrawBezier } from "../ChartLibs/Highcharts/Line/DrawBezier";
import { DrawBezier2 } from "../ChartLibs/Highcharts/Line/DrawBezier2";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  flexShrink: 1,
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
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  // flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
    // "& .MuiDrawer-root": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    // "& .MuiDrawer-root": closedMixin(theme),
  }),
}));
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Sidebar = ({ onChangeTheme, status }, props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Grid
              container
              direction={"row"}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              spacing={2}
            >
              <Grid item>
                <Typography variant="h6" noWrap component="div">
                  Research Chart
                </Typography>
              </Grid>
              <Grid item>
                <ThemeButton onChangeTheme={onChangeTheme} status={status} />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* <Toolbar /> */}
      <Box>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { name: "Highcharts", icon: <Dashboard /> },
              { name: "ChartJS", icon: <MonitorIcon /> },
              { name: "nivo", icon: <AssessmentIcon /> },
              { name: "ploty", icon: <SettingsIcon /> },
              { name: "ApexCharts", icon: <AccountBoxIcon /> },
            ].map((text, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        <Grid
          container
          align="center"
          direction={"row"}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justifyContent={"center"}
        >
          {/*COMPONENT HERE*/}
          <Grid xs={12} sm={12} md={12} lg={12}>
            {/* <LinePlot /> */}
            {/* <HighStock /> */}
            {/* <LineScale /> */}
            {/* <Scatter /> */}
            {/* <BezierCurve /> */}
            {/* <LineSD /> */}
            {/* <MarkyAxis /> */}
            {/* <MarkxAxis /> */}
            {/* <Waterfall /> */}
            {/* <DrawBezier /> */}
            <DrawBezier2 />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}></Grid>
          {/* <NivoLinePlot /> */}
          {/* <D3Scatter /> */}
        </Grid>
      </Box>
    </Box>
  );
};
