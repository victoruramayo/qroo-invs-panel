import HomeIcon from "@mui/icons-material/Home";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import { type JSX } from "react";

export interface MenuItem {
  label: string;
  to: string;
  icon?: JSX.Element; // Opcional, por si quieres agregar iconos
}

export const menuItems: MenuItem[] = [
  {
    label: "Home",
    to: "/dashboard",
    icon: <HomeIcon fontSize="small" />,
  },
  {
    label: "Documentos",
    to: "/dashboard/documents",
    icon: <DocumentScannerOutlinedIcon fontSize="small"/>,
  },
];
export enum DocumentType {
  INFORME = "INFORME",
  DICTAMEN = "DICTAMEN",
}
