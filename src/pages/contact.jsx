import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Mail, Clock } from "lucide-react";

/**
 * Contact.jsx
 * - Form sederhana (Nama, Kontak, Pesan) -> sementara show alert saat submit
 * - Tombol WhatsApp langsung buka chat (example WA number placeholder)
 * - Info kontak / jam kerjaa
 */

const WA_NUMBER = "+6282375328943"; // ganti dengan nomor WhatsAppmu (format internasional tanpa +)

const Contact = () => {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    // Simulasi submit — karena backend belum ada, tampilkan alert
    setTimeout(() => {
      alert(
        `Terima kasih, ${form.name || "User"}!\nPesan Anda telah terkirim (simulasi).\nKami akan menghubungi via: ${form.contact || "kontak tidak terisi"}`
      );
      setForm({ name: "", contact: "", message: "" });
      setSubmitting(false);
    }, 700);
  }

  function openWhatsApp() {
    const text = encodeURIComponent("Halo, saya mau konsultasi mengenai undangan digital.");
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
  }

  return (
    <main className="min-h-screen py-12">
      <section className="max-w-6xl mx-auto p-20 bg-white/40 backdrop-blur-lg rounded-4xl">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="inline-block text-xs uppercase tracking-wide text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Hubungi Kami
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">
            Siap diskusi? Kami siap membantu <span className="text-sky-600">dengan hangat</span>
          </h1>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Isi formulir di bawah atau mulai chat langsung via WhatsApp untuk respon cepat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-100 shadow"
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

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-600 text-white font-medium shadow hover:brightness-95 transition"
              >
                {submitting ? "Mengirim..." : "Kirim Pesan (simulasi)"}
              </button>

              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200 bg-white text-sky-600 font-medium shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Chat via WhatsApp
              </button>
            </div>
          </motion.form>

          {/* Info sidebar */}
          <motion.aside
            className="md:col-span-4 bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-100 shadow"
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

            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Jam kerja: Senin–Jumat, 09:00–17:00</span>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Mail className="w-4 h-4" />
                <span>Email: hello@sevencompany.id</span>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Phone className="w-4 h-4" />
                <span>WhatsApp: +62 812-3456-7890</span>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <strong>Catatan:</strong> Saat ini form hanya simulasi — untuk pemesanan
              dan demo live, silakan chat via WhatsApp untuk respon cepat.
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
};

export default Contact;
