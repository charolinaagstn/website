import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Mail, Clock } from "lucide-react";

const WA_NUMBER = "6282375328943"; // ✅ Format tanpa tanda +

const Contact = () => {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Handle input perubahan
  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  // 🔹 Simulasi pengiriman form
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      alert(
        `Terima kasih, ${form.name || "User"}!\nPesan Anda telah terkirim (simulasi).\nKami akan menghubungi via: ${form.contact || "kontak tidak terisi"}`
      );
      setForm({ name: "", contact: "", message: "" });
      setSubmitting(false);
    }, 700);
  }

  // 🌸 WhatsApp Template Premium
  function openWhatsApp() {
    const { name, contact, message } = form;

    const text = encodeURIComponent(
      `🌸 *Halo Seven Company!* 🌸

Saya tertarik dengan layanan *Digital Invitation* Anda. 
Berikut beberapa detail awal saya:

👤 *Nama:* ${name || "(belum diisi)"}
📱 *Kontak:* ${contact || "(belum diisi)"}

💬 *Pesan atau kebutuhan saya:* 
${message || "Belum ada pesan."}

✨ Saya ingin tahu lebih lanjut tentang:
- 💌 Desain & fitur yang tersedia
- 💰 Paket harga dan promo aktif
- 🚀 Estimasi waktu pengerjaan

🕒 *Dikirim pada:* ${new Date().toLocaleString("id-ID")}

Terima kasih sudah meluangkan waktu membaca pesan saya 💖  
Semoga harimu menyenangkan! 🌷`
    );

    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
  }

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6">
      <section className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg p-6 sm:p-10 md:p-12 lg:p-16">
        {/* Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="inline-block text-xs uppercase tracking-wide text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Hubungi Kami
          </p>

          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
            Siap diskusi? Kami siap membantu{" "}
            <span className="text-sky-600">dengan hangat 💬</span>
          </h1>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Isi formulir di bawah atau mulai chat langsung via WhatsApp untuk respon cepat dan ramah.
          </p>
        </motion.div>

        {/* Grid Konten */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-slate-100 shadow"
          >
            <label className="text-sm text-gray-700">Nama</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama lengkap"
              className="mt-2 mb-4 w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />

            <label className="text-sm text-gray-700">Kontak (Email / WhatsApp)</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="contoh: email@domain.com atau +628123..."
              className="mt-2 mb-4 w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />

            <label className="text-sm text-gray-700">Pesan / Kebutuhan singkat</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Ceritakan tema, tanggal rencana, atau fitur yang diinginkan..."
              className="mt-2 mb-4 w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2 rounded-full bg-sky-600 text-white font-medium shadow hover:brightness-95 transition"
              >
                {submitting ? "Mengirim..." : "Kirim Pesan (simulasi)"}
              </button>

              <button
                type="button"
                onClick={openWhatsApp}
                className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center items-center gap-2 px-4 py-2 rounded-full border border-sky-200 bg-white text-sky-600 font-medium shadow-sm hover:bg-sky-50"
              >
                <Phone className="w-4 h-4" />
                Chat via WhatsApp
              </button>
            </div>
          </motion.form>

          {/* Sidebar Info */}
          <motion.aside
            className="lg:col-span-4 bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-100 shadow"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-sky-600" />
              <div>
                <div className="text-sm text-gray-600">Layanan</div>
                <div className="font-semibold text-sky-700">Konsultasi & Custom Template</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Jam kerja: Senin–Jumat, 09:00–17:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Email: hello@sevencompany.id</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>WhatsApp: +62 823-7532-8943</span>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <strong>Catatan:</strong> Saat ini form hanya simulasi — untuk pemesanan dan demo live, silakan chat via WhatsApp agar tim kami dapat merespons lebih cepat 💙
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
};

export default Contact;
