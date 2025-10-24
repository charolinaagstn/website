import React from "react";

const Footer = () => {
  return (
      <footer className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg shadow-sm border-t border-slate-900/10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} Seven Company. All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <a>Privasi</a>
            <a>Syarat</a>
            <a>Kontak</a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
