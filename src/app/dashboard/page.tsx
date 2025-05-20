import { auth } from "@/server/auth";
import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default async function Dashboard() {
  const session = await auth();

  return (
    <Box >
      <Typography fontSize="2xl" fontWeight="bold" mb="4">
        Welcome to the Dashboard!
      </Typography>
      <Typography fontSize="md">Bienvenido, {session?.user.email}</Typography>
    </Box>
  );
}
