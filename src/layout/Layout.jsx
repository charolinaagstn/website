import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div
      className="min-h-screen flex flex-col font-[Poppins] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bgk.jpg')",
      }}
    >
      {/* Overlay agar teks tetap terbaca */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <Header />

        {/* MAIN CONTENT WRAPPER */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Outlet />
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
