"use client";

import { darkTheme, lightTheme } from "./themes";
import React, { useState, Suspense } from "react";
import { Grid, Paper, ThemeProvider } from "@mui/material";
import { Sidebar } from "./components/Sidebar";

export default function Home() {
  const onChangeTheme = (val) => {
    console.log(val);
    if (val) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  let [theme, setTheme] = useState(lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <Sidebar onChangeTheme={onChangeTheme} status={theme}></Sidebar>
    </ThemeProvider>
  );
}
