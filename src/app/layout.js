// src/app/layout.js
'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "MongoNext | Next.js MongoDB Starter Kit",
  description: "A production-ready starter template for building modern web applications with Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}