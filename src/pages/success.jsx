import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  // Optional: Auto redirect setelah 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-green-500 text-white flex items-center justify-center rounded-full">
          ✅
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Pesanan Terkirim!
        </h1>
        <p className="text-gray-600 mb-6">
          Terima kasih! Data kamu sudah kami terima dan akan segera kami proses.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
        >
          Kembali ke Beranda Sekarang
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Kamu akan diarahkan otomatis dalam 3 detik...
        </p>
      </div>
    </div>
  );
}
