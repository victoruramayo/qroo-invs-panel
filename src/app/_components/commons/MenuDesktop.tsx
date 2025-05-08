"use client";
import { menuItems } from "@/app/_components/commons/menu";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuDesktop() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<number>(-1); //

  const handleNavigation = (index: number) => {
    setActiveItem(index);
  };

  useEffect(() => {
    const index = menuItems.findIndex((item) => {
      if (pathname === item.to) return true;

      if (item.to === "/dashboard") {
        return pathname === "/dashboard";
      }

      return pathname.startsWith(item.to + "/");
    });

    if (index !== -1) {
      setActiveItem(index);
    }
  }, [pathname]);

  return (
    <List dense>
      {menuItems.map((item, index) => {
        // Normalizar ambas rutas para asegurar comparación correcta

        return (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={activeItem === index}
              href={item.to}
              onClick={() => handleNavigation(index)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
