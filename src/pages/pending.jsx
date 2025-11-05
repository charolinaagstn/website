import React from "react";
import { motion } from "framer-motion";

const Pending = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-white text-center p-6"
    >
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">
        Pembayaran Sedang Diproses 🕒
      </h1>
      <p className="text-gray-600 max-w-md">
        Kami telah menerima pesanan Anda. Silakan selesaikan pembayaran agar undangan digital Anda dapat segera diproses.
      </p>
    </motion.div>
  );
};

export default Pending;
