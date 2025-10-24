import React from "react";
import { NavLink } from "react-router-dom";

const navigationLinks = [
  { path: "/", label: "Home" },
  { path: "/design", label: "Desain" },
  { path: "/organization", label: "Struktur" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-900/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-50 to-sky-100 text-sky-700 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-sky-200">
            <span className="text-2xl font-bold">7</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight transition-colors group-hover:text-sky-600">
            Seven Company
          </h1>
        </NavLink>

        {/* Navigasi & CTA */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 text-lg">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group relative pb-1.5 transition-colors duration-300
                   ${
                     isActive
                       ? "font-semibold text-sky-700" 
                       : "font-medium text-slate-600 hover:text-sky-600"
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

          <button className="ml-4 rounded-full bg-sky-50 px-5 py-2.5 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-inset ring-sky-200 transition-all duration-300 hover:scale-105 hover:bg-sky-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
            Hubungi Kami
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;