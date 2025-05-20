import {
  blue,
  cyan,
  deepPurple,
  green,
  indigo,
  orange,
  pink,
  red,
  teal,
} from "@mui/material/colors";

const colorPalette = [
  deepPurple,
  blue,
  green,
  pink,
  orange,
  teal,
  cyan,
  indigo,
  red,
];
const shade = 300; // puedes ajustar esto (ej. 300 o 700)

export function stringToColor(name?: string | null) {
  if (!name) return "#ccc"; // fallback

  // Simple hash
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colorPalette.length;
  const color = colorPalette[index];

  return color ? color[shade] : pink[shade];
}
export function getInitials(fullName?: string | null) {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  const initials = names[0]?.[0] ?? "";
  const second = names.length > 1 ? names[names.length - 1]?.[0] : "";
  return `${initials}${second}`.toUpperCase();
}

export function stringAvatar(name?: string | null) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: getInitials(name),
  };
}
