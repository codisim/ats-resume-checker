import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { ActiveThemeProvider } from "@/components/active-theme";
import { GoogleAnalytics } from "@next/third-parties/google";


export const metadata: Metadata = {
  title: "ATS Resume Checker",
  description: "AI-powered resume analysis that helps job seekers identify missing skills, improve ATS compatibility, and optimize resumes for real job descriptions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-background overscroll-none font-sans antialiased",
            activeThemeValue ? `theme-${activeThemeValue}` : "",
            isScaled ? "theme-scaled" : ""
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark" // system
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <ActiveThemeProvider initialTheme={activeThemeValue}>
              {children}
              <GoogleAnalytics gaId="G-F4EP5EY515" />
              <Toaster position="top-left" />
            </ActiveThemeProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
