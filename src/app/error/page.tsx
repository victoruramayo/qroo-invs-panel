"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import LoadingSpinner from "@/app/_components/commons/LoadingSpinner";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

function ClientErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "Unknown error";

  return (
    <Box textAlign="center" mt="20">
      <Typography variant="h5" color="error" sx={{ m: 4 }}>
        Oops! Authentication Error
      </Typography>
      <Typography sx={{ mb: 4 }} color="text.secondary">
        {error}
      </Typography>
      <Button variant="contained" onClick={() => router.push("/")}>Go to Login</Button>
    </Box>
  );
}
export default function ErrorPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ClientErrorPage />
    </Suspense>
  );
}
