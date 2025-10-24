import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, MessageCircle, ImageIcon } from "lucide-react";

/**
 * Home (clean & elegant)
 * - Tone: startup/creative studio yang baru berkembang (no big claims)
 * - Colors: light / white with soft-gold accent
 * - No stats/testimonials; fokus pada product, demo, RSVP, contact
 *
 * Assumptions:
 * - TailwindCSS installed
 * - framer-motion & lucide-react installed
 * - Header/Footer handled in Layout
 */

const Home = () => {
  return (
    <main className="min-h-screen bg-white/40 backdrop-blur-lg text-slate-900 rounded-4xl">
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="max-w-2xl">
              <p className="inline-block text-xs uppercase tracking-wide text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                Creative Studio • Undangan Digital
              </p>

              <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Undangan Digital yang <span className="text-sky-600">Hangat</span> & Mudah
              </h1>

              <p className="mt-4 text-gray-600 text-base">
                Kami tim kecil yang berdedikasi membantu kamu membuat undangan digital
                personal dan mudah dibagikan. Cocok untuk pernikahan, syukuran, atau
                acara keluarga — sederhana, cepat, dan elegan.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/demo"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sky-600 text-white font-semibold shadow-md hover:brightness-95 transition"
                >
                  <Calendar className="w-4 h-4" />
                  Lihat Demo
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-sky-200 bg-white text-sky-600 font-medium shadow-sm hover:shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasi Gratis
                </a>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 opacity-70" />
                  <span>Proses sederhana — mulai dari briefing hingga live</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-70" />
                  <span>Fokus pada kualitas & pengalaman tamu</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview Card / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              {/* soft background shape */}
              <div className="absolute -left-10 -top-8 w-40 h-40 rounded-full bg-sky-100 opacity-60 blur-2xl" />

              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-5">
                <div className="text-xs text-gray-400">Preview Undangan Pernikahan</div>

                <div className="mt-3 rounded-lg overflow-hidden border border-slate-100">
                  <div className="relative w-full aspect-video"> {/* Menjaga keseimbangan rasio gambar */}
                    <img
                      src="/citra.png"
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay teks agar responsif dan elegan */}
                    <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="text-white font-semibold text-sm">Nama Pasangan</div>
                      <div className="text-white/80 text-xs">Tanggal • Lokasi</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div>RSVP</div>
                      <div className="text-sky-600 font-medium">Klik untuk detail</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating CTA */}
              <a
                href="/demo"
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-sky-600 text-white px-4 py-2 rounded-full shadow-md text-sm font-medium hover:brightness-95 transition"
              >
                Lihat Demo Lengkap
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SIMPLE FEATURE ROW (value statements) */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bg-white rounded-xl p-4 text-center border border-slate-100 shadow-sm"
          >
            <div className="text-sm font-semibold text-sky-600">Personalisasi</div>
            <div className="mt-2 text-sm text-gray-600">Tema, musik, teks — sesuai selera.</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-4 text-center border border-slate-100 shadow-sm"
          >
            <div className="text-sm font-semibold text-sky-600">Proses Jelas</div>
            <div className="mt-2 text-sm text-gray-600">Langkah terstruktur dari briefing hingga live.</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-xl p-4 text-center border border-slate-100 shadow-sm"
          >
            <div className="text-sm font-semibold text-sky-600">Support</div>
            <div className="mt-2 text-sm text-gray-600">Kami bantu setup QR/Share & small-troubleshooting.</div>
          </motion.div>
        </div>
      </section>

      {/* PACKAGES (placeholder) */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Paket & Harga (contoh)</h2>
          <p className="text-sm text-gray-600 mt-2">
            Kami bisa siapkan paket sederhana sesuai kebutuhan. Detail harga akan kami
            diskusikan saat konsultasi.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-slate-100 bg-slate-50 text-center">
              <div className="font-semibold">Starter</div>
              <div className="mt-2 text-sm text-gray-600">Template dasar • Share link</div>
            </div>
            <div className="p-4 rounded-lg border border-slate-100 bg-white text-center shadow">
              <div className="font-semibold">Kustom</div>
              <div className="mt-2 text-sm text-gray-600">Personalisasi layout & musik</div>
            </div>
            <div className="p-4 rounded-lg border border-slate-100 bg-slate-50 text-center">
              <div className="font-semibold">Full Service</div>
              <div className="mt-2 text-sm text-gray-600">Setup domain & QR, support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER CTA */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-sky-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-sky-100">
          <div>
            <div className="text-lg font-semibold text-sky-600">Butuh bantuan atau demo?</div>
            <div className="text-sm text-gray-600 mt-1">Hubungi kami untuk sesi singkat dan penjelasan paket.</div>
          </div>

          <div className="flex gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-600 text-white font-medium shadow"
            >
              <MessageCircle className="w-4 h-4" />
              Telepon / WhatsApp
            </a>

            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200 bg-white text-sky-600 font-medium"
            >
              <ImageIcon className="w-4 h-4" />
              Minta Demo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
