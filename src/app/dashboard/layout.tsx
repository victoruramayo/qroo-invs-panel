import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import DashBoardLayout from "@/app/_components/Dashboard";
import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <DashBoardLayout session={session}>
      {children}
      <Toaster/>
    </DashBoardLayout>
  );
}
