"use client";

import { useSearchParams } from "next/navigation";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "Unknown error";

  return (
    <Box textAlign="center" mt="20">
      <Text fontSize="2xl" color="red.500">
        Oops! Authentication Error
      </Text>
      <Text mt="4" color="gray.600">
        {error}
      </Text>
      <Button mt="6" colorScheme="teal" onClick={() => router.push("/")}>
        Go to Login
      </Button>
    </Box>
  );
}
