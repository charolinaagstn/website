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
  {/* Tagline */}
  <p className="inline-block text-xs uppercase tracking-wide text-sky-700 bg-sky-50 px-4 py-1.5 rounded-full font-medium shadow-sm">
    Seven Company • Undangan Digital Eksklusif
  </p>

  {/* Headline */}
  <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
    Buat Momen <span className="text-sky-600">Berharga</span> Jadi
    <br className="hidden sm:block" /> Undangan Digital yang Tak Terlupakan
  </h1>

  {/* Subheadline */}
  <p className="mt-4 text-gray-600 text-base leading-relaxed">
    Kami merancang undangan digital dengan desain elegan, sentuhan personal,
    dan pengalaman interaktif — sempurna untuk pernikahan, ulang tahun,
    hingga acara istimewa lainnya. Semua bisa dibuat cepat, mudah, dan penuh kesan.
  </p>

  {/* CTA Buttons */}
  <div className="mt-6 flex flex-wrap gap-3">
    

    <a
      href="#contact"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-sky-200 bg-white text-sky-600 font-semibold shadow-sm hover:bg-sky-50 hover:shadow-md transition-all duration-300"
    >
      <MessageCircle className="w-4 h-4" />
      Konsultasi Gratis
    </a>
  </div>

  {/* Highlights */}
  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500">
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-sky-500 opacity-80" />
      <span>Proses cepat & transparan — dari desain hingga siap dibagikan</span>
    </div>
    <div className="flex items-center gap-2">
      <MapPin className="w-4 h-4 text-sky-500 opacity-80" />
      <span>Desain responsif & nyaman dilihat di semua perangkat</span>
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
                      src="/undngn.jpg"
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
                      <div className="text-sky-600 font-medium">Contoh Undangan</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating CTA */}
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* SIMPLE FEATURE ROW (value statements) */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.05 }}
    className="bg-gradient-to-br from-sky-50 to-white rounded-2xl p-6 text-center border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300"
  >
    <div className="text-lg font-semibold text-sky-700">Desain Eksklusif</div>
    <div className="mt-2 text-sm text-gray-600">
      Setiap undangan dibuat dengan sentuhan desain yang elegan dan personal — mencerminkan cerita spesial Anda.
    </div>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-6 text-center border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300"
  >
    <div className="text-lg font-semibold text-rose-600">Fitur Interaktif</div>
    <div className="mt-2 text-sm text-gray-600">
      Tambahkan galeri foto, peta lokasi, hingga hitung mundur acara — buat undangan lebih hidup!
    </div>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.15 }}
    className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 text-center border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300"
  >
    <div className="text-lg font-semibold text-emerald-600">Proses Cepat & Support Penuh</div>
    <div className="mt-2 text-sm text-gray-600">
      Kami bantu dari awal hingga undangan siap dibagikan — respon cepat dan pelayanan ramah.
    </div>
  </motion.div>
</div>

      </section>

      {/* PACKAGES (placeholder) */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-slate-100 shadow-md">
  <h2 className="text-2xl font-bold text-sky-800 text-center mb-2">Paket & Harga Undangan Digital</h2>
  <p className="text-sm text-gray-600 text-center max-w-xl mx-auto">
    Pilih paket yang sesuai dengan kebutuhan dan gaya acaramu — dari versi simpel hingga tampilan eksklusif lengkap
    dengan fitur interaktif.
  </p>

  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
    {/* Paket 1 */}
    <div className="p-6 rounded-2xl border border-slate-100 bg-sky-50/40 text-center hover:shadow-lg transition">
      <div className="text-lg font-semibold text-sky-800">Basic</div>
      <div className="mt-2 text-sm text-gray-600 leading-relaxed">
        Tema standar pilihanmu <br /> + Link undangan siap kirim
      </div>
      <div className="mt-3 font-semibold text-sky-700">Rp 15.000</div>
    </div>

    {/* Paket 2 */}
    <div className="p-6 rounded-2xl border border-sky-200 bg-gradient-to-b from-white to-sky-50 text-center shadow-lg">
      <div className="text-lg font-semibold text-sky-800">Premium</div>
      <div className="mt-2 text-sm text-gray-600 leading-relaxed">
        Desain lebih elegan <br /> + galeri foto & lokasi acara
      </div>
      <div className="mt-3 font-semibold text-sky-700">Rp 25.000</div>
      <div className="mt-3">
        <span className="inline-block bg-sky-600 text-white text-xs px-3 py-1 rounded-full">
          Favorit!
        </span>
      </div>
    </div>

    {/* Paket 3 */}
    <div className="p-6 rounded-2xl border border-slate-100 bg-sky-50/40 text-center hover:shadow-lg transition">
      <div className="text-lg font-semibold text-sky-800">Exclusive</div>
      <div className="mt-2 text-sm text-gray-600 leading-relaxed">
        Desain full custom + domain pribadi <br /> + QR code & dukungan penuh
      </div>
      <div className="mt-3 font-semibold text-sky-700">Rp 30.000</div>
    </div>
  </div>

  <p className="mt-6 text-center text-xs text-gray-500">
    *Harga dapat menyesuaikan tema & permintaan khusus.
  </p>
</div>

      </section>

      {/* CONTACT / FOOTER CTA */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-sky-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-sky-100">
          <div>
            <div className="text-lg font-semibold text-sky-600">Butuh bantuan ?</div>
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

          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
