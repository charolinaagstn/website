import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Pending = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();

  const [status, setStatus] = useState("pending");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const checkStatus = async () => {
      setChecking(true);
      try {
        const res = await fetch(`/api/check-status?order_id=${orderId}`);
        const data = await res.json();

        console.log("🔍 Status transaksi:", data.transaction_status);
        setStatus(data.transaction_status);

        // Jika pembayaran sudah selesai → redirect ke success page
        if (data.transaction_status === "settlement") {
          navigate(`/success?order_id=${orderId}`);
        }
      } catch (error) {
        console.error("❌ Gagal memeriksa status:", error);
      } finally {
        setChecking(false);
      }
    };

    // Jalankan pertama kali
    checkStatus();

    // Cek ulang setiap 10 detik
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, [orderId, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-white text-center p-6"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <Loader2 className="text-yellow-500 w-10 h-10 mb-4" />
      </motion.div>

      <h1 className="text-3xl font-bold text-yellow-600 mb-2">
        Pembayaran Sedang Diproses 🕒
      </h1>
      <p className="text-gray-600 max-w-md mb-6">
        Kami telah menerima pesanan Anda. Silakan selesaikan pembayaran agar undangan digital Anda dapat segera diproses.
      </p>

      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
        Status saat ini:{" "}
        <span className="font-semibold capitalize">{status}</span>{" "}
        {checking && <span className="ml-1 animate-pulse">(memeriksa...)</span>}
      </div>
    </motion.div>
  );
};

export default Pending;
