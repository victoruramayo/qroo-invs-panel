import { Stack } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";


export default function LoadingSpinner() {
  return (
    <Stack direction="row">
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Stack>
  );
}
