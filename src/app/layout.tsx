import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/mui";
import { Geist } from 'next/font/google';
import localFont from 'next/font/local';  


const geist = Geist({ subsets: ['latin'] })
const standard = localFont({ 
  src: [
    {
      path: '../../public/fonts/standard-book-webfont.ttf',      
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/standard-bold-webfont.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/standard-book-italic-webfont.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/standard-bold-italic-webfont.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
});


export const metadata: Metadata = {
  title: "Texas Defense Data",
  description: "The only site for publicly available indigent defense data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
