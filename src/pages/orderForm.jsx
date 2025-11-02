import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { Loader2, CreditCard } from "lucide-react";

const SERVICE_ID = "seven-company";
const TEMPLATE_ID = "template_7gt34p8";
const PUBLIC_KEY = "0R7sDdn02-pMuex6W";

const OrderForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tema: "",
    harga: "",
    pesan: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      tema: searchParams.get("tema") || "",
      harga: searchParams.get("harga") || "",
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanHarga = parseInt(formData.harga.replace(/\D/g, "")) || 50000;

    const emailPayload = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.phone,
      tema: formData.tema,
      harga: `Rp ${cleanHarga.toLocaleString("id-ID")}`,
      catatan: formData.pesan || "Tidak ada catatan",
      time: new Date().toLocaleString("id-ID"),
      status: "Menunggu Pembayaran",
    };

    try {
      // 📩 Kirim email "Menunggu Pembayaran"
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailPayload, PUBLIC_KEY);
      console.log("✅ Email status pending dikirim");

      // 💳 Buat transaksi Midtrans
      const res = await fetch("/api/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cleanHarga,
          name: formData.name,
          email: formData.email,
        }),
      });

      const data = await res.json();
      if (!data.token) throw new Error("Gagal mendapatkan token Midtrans.");

      window.snap.pay(data.token, {
        onSuccess: async (result) => {
          console.log("✅ Pembayaran sukses:", result);

          // 📧 Kirim email "Pembayaran Selesai"
          const successPayload = {
            ...emailPayload,
            status: "Pembayaran Selesai ✅",
            transaction_id: result.transaction_id,
            order_id: result.order_id,
            payment_type: result.payment_type, // Tidak perlu QRIS di email sukses
          };

          await emailjs.send(SERVICE_ID, TEMPLATE_ID, successPayload, PUBLIC_KEY);
          navigate("/success");
        },
        onPending: (result) => {
          console.log("🕒 Pending:", result);
          navigate("/pending");
        },
        onError: (err) => {
          console.error("❌ Error:", err);
          alert("Terjadi kesalahan saat memproses pembayaran.");
        },
      });
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Gagal memproses pembayaran. Periksa koneksi atau data Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto mt-10 p-6 sm:p-8 bg-gradient-to-br from-sky-50 to-white rounded-3xl shadow-2xl border border-sky-100"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-sky-700 mb-2">
          Pembayaran Undangan
        </h2>
        <p className="text-slate-500 text-sm">
          Isi data Anda dengan benar untuk melanjutkan proses pembayaran
        </p>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        {["name", "email", "phone"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={
              field === "name"
                ? "Nama Lengkap"
                : field === "email"
                ? "Alamat Email"
                : "Nomor WhatsApp"
            }
            className="w-full p-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            name="tema"
            readOnly
            className="flex-1 p-3 border rounded-xl bg-gray-100 font-medium text-gray-700"
            value={formData.tema}
          />
          <input
            name="harga"
            readOnly
            className="sm:w-1/3 p-3 border rounded-xl bg-gray-100 font-semibold text-right text-green-700"
            value={formData.harga}
          />
        </div>

        <textarea
          name="pesan"
          placeholder="Catatan tambahan (opsional)"
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-sky-300 focus:outline-none"
          onChange={handleChange}
          value={formData.pesan}
        ></textarea>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className={`w-full py-4 text-white text-lg font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-600 to-cyan-400 hover:brightness-110"
            }`}
        >
          {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={22} />}
          {loading ? "Memproses Pembayaran..." : "Kirim & Bayar Sekarang"}
        </motion.button>
      </form>
    </motion.section>
  );
};

export default OrderForm;
