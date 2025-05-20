import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Divider, Drawer, IconButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuDesktop from "@/app/_components/commons/MenuDesktop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { signOut, useSession } from "next-auth/react";
import { stringAvatar } from "@/app/utils/avatarUtils";

const DRAWER_MAX_WIDTH = 256;

interface Props {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

export default function SideMenu({ drawerOpen, toggleDrawer }: Props) {
  const { data: session } = useSession();

  // Drawer configuration based on screen size

  return (
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{
        width: DRAWER_MAX_WIDTH,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 2,
        }}
      >
        <DashboardIcon color="secondary" sx={{ mb: 2 }} fontSize="large" />
        <Typography variant="h6" sx={{ mt: 1 }}>
          Dashboard
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuDesktop />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
          width: DRAWER_MAX_WIDTH,
        }}
      >
        <Avatar
          sizes="small"
          alt={session?.user?.name ?? "user avar"}
          {...stringAvatar(session?.user?.name)}
        />
        <Stack
          direction="column"
          sx={{
            overflow: "hidden",
          }}
        >
          <Typography variant="body2" noWrap sx={{ minWidth: 0 }}>
            {session?.user?.name}
          </Typography>
          <Typography
            variant="caption"
            noWrap
            sx={{
              color: "text.secondary",
              minWidth: 0,
            }}
          >
            {session?.user?.email}
          </Typography>
        </Stack>
        <IconButton size="small" onClick={() => signOut()}>
          <LogoutRoundedIcon />
        </IconButton>
      </Stack>
    </Drawer>
  );
}
