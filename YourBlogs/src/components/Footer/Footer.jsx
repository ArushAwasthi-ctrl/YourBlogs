import React from "react";
import { Link } from "react-router-dom";
import { Logo, Container } from "../input";

function Footer() {
  const year = new Date().getFullYear(); // Auto-update year

  return (
    <footer className="bg-white shadow-md border-t border-gray-200 mt-10">
      <Container>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between py-8 px-4 gap-8">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <div className="flex items-center gap-2">
              <Logo width="50px" />
              <span className="text-xl font-bold text-blue-600">YourBlogs</span>
            </div>
            <p className="text-gray-600 text-sm">
              &copy; {year} YourBlogs. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-8 md:w-2/3">
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Company</h3>
              <ul className="flex flex-col gap-2">
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Features</Link></li>
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Pricing</Link></li>
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Affiliate Program</Link></li>
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Press Kit</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Support</h3>
              <ul className="flex flex-col gap-2">
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Account</Link></li>
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Help</Link></li>
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Contact Us</Link></li>
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Customer Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Legals</h3>
              <ul className="flex flex-col gap-2">
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Terms & Conditions</Link></li>
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Privacy Policy</Link></li>
                <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
