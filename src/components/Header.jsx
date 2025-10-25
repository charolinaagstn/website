import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MessageCircle, Menu, X } from "lucide-react";

const navigationLinks = [
  { path: "/", label: "Beranda" },
  { path: "/design", label: "Desain" },
  { path: "/organization", label: "Struktur" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/40 backdrop-blur-xl border-b border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo & Brand */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-sky-100 via-white to-sky-200 shadow-lg shadow-sky-100/60 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
  <img
    src="/logo.jpg"
    alt="logo"
    className="w-full h-full object-cover"
  />
</div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight transition-colors duration-300 group-hover:text-sky-700">
              Seven Company
            </h1>
            <span className="text-xs text-sky-600 font-medium tracking-wide uppercase">
              Digital Invitation Studio
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative group pb-1.5 transition-all duration-300
                ${
                  isActive
                    ? "text-sky-700 font-semibold"
                    : "text-slate-600 hover:text-sky-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-sky-600 rounded-full transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button (Desktop) */}
        <a
          href="/contact"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-1"
        >
          <MessageCircle className="w-4 h-4" />
          Hubungi Kami
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-sky-700 hover:bg-sky-50 rounded-full transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-lg animate-fadeIn">
          <nav className="flex flex-col px-6 py-4 space-y-3 text-base">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-sky-50 text-sky-700 font-semibold"
                      : "text-slate-600 hover:bg-sky-50 hover:text-sky-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 mt-2 rounded-full bg-gradient-to-r from-sky-600 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Hubungi Kami
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
