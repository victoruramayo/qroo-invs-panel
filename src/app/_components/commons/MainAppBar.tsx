"use client";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Stack } from "@mui/system";

interface Props {
  toggleDrawer: () => void;
}

export default function MainAppBar({ toggleDrawer }: Props) {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    console.log(mode);
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="inherit"
              aria-label="abrir menu"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Stack>

          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 2 }}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
