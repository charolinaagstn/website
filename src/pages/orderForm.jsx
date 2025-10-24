import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      tema: searchParams.get("tema") || "",
      harga: searchParams.get("harga") || ""
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "seven-company", // Service ID
        "template_7gt34p8", // Template ID
        formData,
        "0R7sDdn02-pMuex6X" // Public Key (User ID)
      )
      .then(
        () => {
          navigate("/success");
        },
        (error) => {
          alert("Gagal mengirim email. Coba lagi.");
          console.error(error);
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
