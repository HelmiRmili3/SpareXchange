import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div>
            <h2 className="text-xl font-bold">SpareXchange</h2>
            <p className="text-sm mt-2">
              Your platform to Sell, Exchange, Donate, Freelance & Transport.
            </p>
          </div>

          {/* Center Links */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-gray-300">
                  Sell
                </Link>
              </li>
              <li>
                <Link to="/exchange" className="hover:text-gray-300">
                  Exchange
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-gray-300">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/freelance" className="hover:text-gray-300">
                  Freelance
                </Link>
              </li>
              <li>
                <Link to="/transport" className="hover:text-gray-300">
                  Transport
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section (Social Media) */}
          <div>
            <h2 className="text-lg font-semibold">Follow Us</h2>
            <div className="flex space-x-4 mt-2 justify-center md:justify-start">
              <a href="#" className="hover:text-gray-300 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-gray-300 text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-gray-300 text-2xl">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-gray-400 pt-4 text-sm text-center">
          © {new Date().getFullYear()} SpareXchange. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
