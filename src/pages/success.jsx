import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get("order_id");

    if (orderId) {
      fetch("/api/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (["capture", "settlement"].includes(data.transaction_status)) {
            setStatus("success");
          } else if (data.transaction_status === "pending") {
            setStatus("pending");
          } else {
            setStatus("failed");
          }
        })
        .catch(() => setStatus("error"));
    }

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, location.search]);

  const renderStatus = () => {
    switch (status) {
      case "checking":
        return { icon: "⏳", title: "Memeriksa Pembayaran...", color: "text-gray-600" };
      case "success":
        return { icon: "✅", title: "Pembayaran Berhasil!", color: "text-green-600" };
      case "pending":
        return { icon: "🕒", title: "Menunggu Pembayaran...", color: "text-yellow-600" };
      case "failed":
        return { icon: "❌", title: "Pembayaran Gagal", color: "text-red-600" };
      default:
        return { icon: "⚠️", title: "Terjadi Kesalahan", color: "text-gray-600" };
    }
  };

  const { icon, title, color } = renderStatus();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md text-center">
        <div className={`w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full text-4xl ${color}`}>
          {icon}
        </div>
        <h1 className={`text-2xl font-bold mb-2 ${color}`}>{title}</h1>
        <p className="text-gray-600 mb-6">
          {status === "success"
            ? "Terima kasih! Pembayaran kamu sudah kami terima."
            : "Tunggu sebentar, kami sedang memverifikasi transaksi kamu..."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
        >
          Kembali ke Beranda
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Kamu akan diarahkan otomatis dalam 5 detik...
        </p>
      </div>
    </div>
  );
}
