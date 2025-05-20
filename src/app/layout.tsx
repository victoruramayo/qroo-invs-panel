import "../styles/main.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";
import InitColorSchemeScript from "@mui/system/InitColorSchemeScript";
import { MuiDateProvider } from "@/app/_components/providers/MuiDateProvider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Qroo Dashboard",
  description: "Dashboard para fiscalia",
  icons: [{ rel: "icon", url: "/speedometer.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <SessionProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MuiDateProvider>
                <TRPCReactProvider>{children}</TRPCReactProvider>
              </MuiDateProvider>
            </ThemeProvider>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
