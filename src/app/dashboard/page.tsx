import { auth } from "@/server/auth";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default async function Dashboard() {
  const session = await auth();

  return (
    <Box bg="gray.800" color="white" p={8} borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Welcome to the Dashboard!
      </Text>
      <Text fontSize="md">Bienvenido, {session?.user.email}</Text>
    </Box>
  );
}
