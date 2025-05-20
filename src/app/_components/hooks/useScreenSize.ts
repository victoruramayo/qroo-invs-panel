import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/system";

export const useScreenSize = () => {
  const theme = useTheme();

  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const isXLarge = useMediaQuery(theme.breakpoints.down("xl"));
  const isXXLarge = useMediaQuery(theme.breakpoints.up("xl"));

  return {
    isXSmall,
    isSmall,
    isMedium,
    isLarge,
    isXLarge,
    isXXLarge,
  };
};
