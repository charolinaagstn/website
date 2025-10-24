import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

// ✅ Config EmailJS (BIARKAN INI - nanti kamu yang isi)
const SERVICE_ID = "seven-company"; // Ganti jika perlu
const TEMPLATE_ID = "template_7gt34p8"; // Ganti jika perlu
const PUBLIC_KEY = "0R7sDdn02-pMuex6W"; // Ganti jika perlu

const OrderForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tema: "",
    harga: "",
    pesan: "",
  });

  // ✅ Set tema & harga dari URL
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Buat payload sesuai template EmailJS
    const payload = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.phone,
      tema: formData.tema,
      harga: formData.harga,
      catatan: formData.pesan || "Tidak ada catatan",
      time: new Date().toLocaleString("id-ID"), // contoh waktu
      qris: "https://dummyimage.com/300x300/000/fff&text=QRIS+Dummy", // Dummy QRIS
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY)
      .then(
        () => {
          navigate("/success");
        },
        (error) => {
          alert("Gagal mengirim email. Coba lagi.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <section className="max-w-xl mx-auto p-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-sky-700 mb-4">
        Form Pemesanan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Lengkap"
          className="w-full p-3 border rounded-lg"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="No WhatsApp"
          className="w-full p-3 border rounded-lg"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="tema"
          readOnly
          className="w-full p-3 border bg-gray-100 rounded-lg"
          value={formData.tema}
        />

        <input
          type="text"
          name="harga"
          readOnly
          className="w-full p-3 border bg-gray-100 rounded-lg"
          value={formData.harga}
        />

        <textarea
          name="pesan"
          placeholder="Catatan tambahan (opsional)"
          className="w-full p-3 border rounded-lg"
          onChange={handleChange}
          value={formData.pesan}
        ></textarea>

        <button
          type="submit"
          className="w-full py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition"
        >
          Kirim & Lanjutkan Pembayaran
        </button>
      </form>
    </section>
  );
};

export default OrderForm;
