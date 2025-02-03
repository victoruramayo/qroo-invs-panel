import { IconType } from "react-icons";
import { MdHome, MdOutlineDocumentScanner } from "react-icons/md";

export interface MenuItem {
  label: string;
  to: string;
  icon?: IconType; // Opcional, por si quieres agregar iconos
}

export const menuItems: MenuItem[] = [
  {
    label: "Home",
    to: "",
    icon: MdHome,
  },
  {
    label: "Documentos",
    to: "/documents",
    icon: MdOutlineDocumentScanner,
  },
];
