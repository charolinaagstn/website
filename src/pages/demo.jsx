import React from "react";
import { motion } from "framer-motion";
import { Eye, Grid, Sparkles, Heart } from "lucide-react";

/**
 * Demo.jsx
 * - Single featured mockup + beberapa template card
 * - Soft floral / romantic vibes (visual via gradients / shapes)
 * - TailwindCSS utilities assumed
 */

const templates = [
  {
    id: 1,
    title: "Akad Tradisi",
    subtitle: "Simple & Sakral",
    tag: "Akad",
    colors: "from-rose-100 to-sky-100",
  },
  {
    id: 2,
    title: "Resepsi Elegan",
    subtitle: "Modern dengan sentuhan klasik",
    tag: "Resepsi",
    colors: "from-sky-100 to-indigo-100",
  },
  {
    id: 3,
    title: "Modern Minimal",
    subtitle: "Bersih & Fokus pada teks",
    tag: "Modern",
    colors: "from-emerald-100 to-lime-100",
  },
];

const Demo = () => {
  return (
    <main className="min-h-screen py-12">
      <section className="max-w-6xl mx-auto px-6 bg-white/40 backdrop-blur-lg p-5 rounded-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="inline-block text-xs uppercase tracking-wide text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Demo Template • Undangan Digital
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Lihat Demo Undangan <span className="text-sky-600">Unggulan</span>
          </h1>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Kami menyiapkan contoh template yang mudah disesuaikan. Klik preview untuk melihat demo
            lengkapnya. Template ini hanyalah contoh — semua elemen bisa kamu ubah.
          </p>
        </motion.div>

        {/* Featured demo + side info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl">
              {/* floral decorative */}
              <div className="absolute -left-14 -top-14 w-40 h-40 rounded-full bg-gradient-to-br from-rose-100 to-sky-100 opacity-60 blur-3xl" />
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 opacity-50 blur-3xl" />

              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* mockup visual */}
                <div className="w-full md:w-2/3">
                  <div className="rounded-xl overflow-hidden border border-slate-100">
                    <div className="h-64 bg-gradient-to-br from-rose-100 via-sky-100 to-emerald-100 flex flex-col justify-end p-6">
                      <div className="text-white text-lg font-semibold">Etta & Rangga</div>
                      <div className="text-white/90 text-xs mt-1">26 Mei 2026 • Surakarta</div>
                    </div>

                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-sky-500" />
                          <span>Responsive • Shareable</span>
                        </div>

                        <div className="text-sky-600 font-medium">Demo Live</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <a
                      href="#preview"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-600 text-white font-medium shadow hover:brightness-95 transition"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Demo Lengkap
                    </a>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200 bg-white text-sky-600 font-medium shadow-sm hover:shadow transition"
                    >
                      <Sparkles className="w-4 h-4" />
                      Konsultasi / Custom
                    </a>
                  </div>
                </div>

                {/* info column */}
                <div className="w-full md:w-1/3">
                  <div className="p-4 bg-white/60 backdrop-blur rounded-xl border border-slate-100 shadow-sm">
                    <div className="text-sm text-gray-600">Tentang Demo</div>
                    <div className="font-semibold text-sky-700 mt-2">Template Unggulan</div>
                    <p className="text-sm text-gray-600 mt-2">
                      Template ini memperlihatkan bagaimana undanganmu tampil di desktop & mobile.
                      Semua teks, warna, dan musik dapat dikustom sesuai kebutuhan.
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Grid className="w-4 h-4" />
                        <span>Layout responsif</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Heart className="w-4 h-4" />
                        <span>Personalisasi mudah</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Sparkles className="w-4 h-4" />
                        <span>Support ringan untuk integrasi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Template Grid */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {templates.map((t) => (
                <article
                  key={t.id}
                  className="relative rounded-xl overflow-hidden border border-slate-100 bg-white/70 backdrop-blur p-3 shadow-sm hover:shadow-md transition"
                >
                  <div className={`h-32 rounded-md overflow-hidden bg-gradient-to-br ${t.colors} flex items-end p-3`}>
                    <div className="text-white font-semibold">{t.title}</div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{t.subtitle}</div>
                      <div className="text-xs text-gray-500">{t.tag}</div>
                    </div>

                    <a
                      href="#preview"
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-600 text-white text-sm"
                    >
                      Demo
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Tidak menemukan yang cocok? Kami bisa buatkan custom — hubungi untuk konsultasi.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Demo;
