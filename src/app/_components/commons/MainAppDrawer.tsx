"use client";
import MainAppBar from "@/app/_components/commons/MainAppBar";
import SideMenu from "@/app/_components/commons/SideMenu";
import { type ReactNode, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

export default function MainAppDrawer({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <MainAppBar toggleDrawer={toggleDrawer} />
      <SideMenu drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box sx={theme.mixins.toolbar} />
      <Box
        component="main"
        sx={{
          flex: 1,
          p: {xs: 1, md: 2, lg: 4},
          mt: `${Number(theme.mixins.toolbar.minHeight) + 8}px`,
          overflowX: 'auto'
        }}
      >
        {children}
      </Box>
    </>
  );
}
