import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0F4C5C] text-gray-100 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Hotel Booking</h3>
            <p className="text-sm text-[#E2E8F0]">
              Experience luxury and comfort in the heart of the city. Your
              perfect stay begins here.
            </p>
          </div>

          {/* Our Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
                >
                  Accommodations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
                >
                  Dining & Restaurants
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
                >
                  Spa & Wellness
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
                >
                  Events & Meetings
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
                >
                  Book Now
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
                >
                  Special Offers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
                >
                  Gift Cards
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
                >
                  Loyalty Program
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-2 text-[#E2E8F0]">
              <p>123 Hotel Street</p>
              <p>Dhaka, Bangladesh</p>
              <p>Phone: +8801714 589072</p>
              <p>Email: info@hotelbooking.com</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <Link
                href="https://www.facebook.com"
                className="w-10 h-10 bg-[#1A6B7C] hover:bg-[#2A8A9C] flex items-center justify-center rounded-full transition duration-300"
                target="_blank"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                href="https://www.twitter.com"
                className="w-10 h-10 bg-[#1A6B7C] hover:bg-[#2A8A9C] flex items-center justify-center rounded-full transition duration-300"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Link>
              <Link
                href="https://www.youtube.com"
                className="w-10 h-10 bg-[#1A6B7C] hover:bg-[#2A8A9C] flex items-center justify-center rounded-full transition duration-300"
                target="_blank"
              >
                <i className="fab fa-youtube"></i>
              </Link>
              <Link
                href="https://www.pinterest.com"
                className="w-10 h-10 bg-[#1A6B7C] hover:bg-[#2A8A9C] flex items-center justify-center rounded-full transition duration-300"
                target="_blank"
              >
                <i className="fab fa-pinterest"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1A6B7C] mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#E2E8F0]">
              © {new Date().getFullYear()} Learn with Sumit. All rights
              reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="text-sm text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-[#E2E8F0] hover:text-white hover:underline transition duration-300"
              >
                Cancellation Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
