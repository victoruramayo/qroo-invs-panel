import { auth } from "@/server/auth";
import { Box, Stack } from "@mui/system";
import { redirect } from "next/navigation";
import MainAppDrawer from "@/app/_components/commons/MainAppDrawer";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <Box sx={{ display: "flex" }}>
      {/* Main content */}

      <MainAppDrawer>{children}</MainAppDrawer>
    </Box>
  );
}
