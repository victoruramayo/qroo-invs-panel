import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import DashBoardLayout from "@/app/_components/dashboard";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) redirect("/");

  return <DashBoardLayout session={session}>{children}</DashBoardLayout>;
}
