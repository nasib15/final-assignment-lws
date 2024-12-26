import Navbar from "./components/shared/Navbar";
import "./globals.css";

export const metadata = {
  title: "Hotel Booking",
  description: "Hotel Booking App. Book your hotel now!",
};

export default function RootLayout({ children }) {
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
      <body className={`bg-white text-black`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
