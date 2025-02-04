import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import "./globals.css";

export const metadata = {
  title: "Hotel Booking",
  description: "Hotel Booking App. Book your hotel now!",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <SessionProvider>
        <body className={`bg-white text-black`}>
          <Navbar />
          {modal}
          {children}
          <Footer />
          <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        </body>
      </SessionProvider>
    </html>
  );
}
