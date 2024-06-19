import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  useTheme,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { darkTheme, lightTheme } from "@/app/themes";

export const ThemeButton = (props) => {
  const { onChangeTheme, status } = props;

  return (
    <FormControlLabel
      control={
        <Switch
          checked={status === darkTheme ? true : false}
          onClick={(event) => onChangeTheme(event.target.checked)}
        ></Switch>
      }
      label={status === darkTheme ? "Dark Theme" : "Light Theme"}
    ></FormControlLabel>
  );
};
