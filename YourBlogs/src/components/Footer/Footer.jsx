import React from "react";
import { Link } from "react-router-dom";
import { Logo, Container } from "../input";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="backdrop-blur-md bg-white/60 border-t border-white/40 mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between py-10 gap-10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3 md:w-1/3">
            <Logo />
            <p className="text-gray-700 text-sm">
              © {year} <span className="gradient-text font-semibold">YourBlogs</span>. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-10 md:w-2/3">
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wide">
                Company
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li><Link to="/" className="hover:text-sky-600 transition">Features</Link></li>
                <li><Link to="/" className="hover:text-sky-600 transition">Pricing</Link></li>
                <li><Link to="/" className="hover:text-sky-600 transition">Affiliate Program</Link></li>
                <li><Link to="/" className="hover:text-sky-600 transition">Press Kit</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wide">
                Support
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li><Link to="/" className="hover:text-sky-600 transition">Account</Link></li>
                <li><Link to="/" className="hover:text-sky-600 transition">Help</Link></li>
                <li><Link to="/" className="hover:text-sky-600 transition">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-sky-600 transition">Customer Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wide">
                Legal
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li><Link to="/" className="hover:text-sky-600 transition">Terms & Conditions</Link></li>
                <li><Link to="/" className="hover:text-sky-600 transition">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-sky-600 transition">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
