import Footer from "./components/shared/Footer";
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
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={`bg-white text-black`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
