import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const themes = [
  {
    title: "Elegant Wedding",
    desc: "Sentuhan bunga putih, nuansa gold lembut, dan animasi elegan — sempurna untuk momen sakral penuh cinta.",
    background: "/themes/elegant.png",
    price: "Rp 25.000",
  },
  {
    title: "Rustic Garden",
    desc: "Tema alami dengan dedaunan hijau, kayu vintage, dan aksen bunga liar — cocok untuk pasangan yang menyukai nuansa alam.",
    background: "/themes/rustic.png",
    price: "Rp 28.000",
  },
  {
    title: "Modern Minimalist",
    desc: "Tampilan bersih dan stylish dengan font modern dan warna netral — cocok untuk kamu yang suka kesederhanaan elegan.",
    background: "/themes/minimslist.png",
    price: "Rp 22.000",
  },
  {
    title: "Luxury Gold",
    desc: "Desain premium bernuansa emas dan putih yang mewah, dilengkapi musik latar romantis untuk kesan istimewa.",
    background: "/themes/luxury.png",
    price: "Rp 29.000",
  },
  {
    title: "Birthday Sparkle",
    desc: "Warna cerah, balon, dan animasi confetti — menghadirkan suasana pesta ulang tahun yang meriah dan penuh semangat.",
    background: "/themes/sparkle.png",
    price: "Rp 20.000",
  },
  {
    title: "Sweet 17 Party",
    desc: "Desain girly dengan warna pastel dan efek kilau lembut — cocok untuk perayaan remaja yang unforgettable.",
    background: "/themes/sweet17.png",
    price: "Rp 23.000",
  },
  {
    title: "Aqiqah & Syukuran",
    desc: "Tema islami lembut dengan kaligrafi dan warna pastel — menyampaikan rasa syukur dan doa dengan hangat.",
    background: "/themes/aqiqah.png",
    price: "Rp 18.000",
  },
  {
    title: "Wisuda Moments",
    desc: "Kombinasi warna biru navy dan emas, cocok untuk momen kelulusan yang penuh kebanggaan dan prestasi.",
    background: "/themes/wisuda.png",
    price: "Rp 19.000",
  },
  {
    title: "Engagement Bliss",
    desc: "Tema romantis dengan warna blush dan ivory, cocok untuk acara lamaran yang hangat dan berkesan.",
    background: "/themes/engagment.png",
    price: "Rp 24.000",
  },
  {
    title: "Anniversary Love",
    desc: "Desain elegan dengan elemen foto pasangan, musik romantis, dan ucapan cinta yang bisa disesuaikan.",
    background: "/themes/anniversary.png",
    price: "Rp 26.000",
  },
  {
    title: "Baby Shower",
    desc: "Desain lucu dengan warna lembut biru muda atau pink pastel — cocok untuk menyambut buah hati tercinta.",
    background: "/themes/babyshower.png",
    price: "Rp 20.000",
  },
  {
    title: "Open House Lebaran",
    desc: "Nuansa hijau zamrud dengan ornamen islami modern, cocok untuk undangan halal bihalal atau acara keluarga besar.",
    background: "/themes/lebaran.png",
    price: "Rp 21.000",
  },
];

const Design = () => {
  const navigate = useNavigate();

  const handleOrder = (title, price) => {
    const tema = encodeURIComponent(title);
    const harga = encodeURIComponent(price);
    navigate(`/order?tema=${tema}&harga=${harga}`);
  };

  return (
    <section className="text-center bg-white/40 backdrop-blur-lg p-10 rounded-4xl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="inline-block text-xs uppercase tracking-wide text-sky-600 bg-sky-50 px-4 py-1 rounded-full">
          Tema Undangan
        </p>
        <h2 className="mt-4 text-4xl font-extrabold text-sky-800">
          Pilihan Desain Digital Premium
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Pilih gaya undangan yang mencerminkan kisahmu — klasik, ceria, atau sakral sesuai momen spesial.
        </p>
      </motion.div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {themes.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50"
          >
            {/* FIXED IMAGE SIZE */}
            <div className="h-40 w-full">
              <img src={item.background} alt={item.title} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-sky-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>

              <div className="flex items-center justify-between gap-4">
                <div className="text-lg font-semibold text-sky-800">{item.price}</div>
              </div>

              {/* BUTTONS SECTION */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <motion.a
                  href={item.background}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 border border-sky-500 text-sky-600 rounded-full font-medium hover:bg-sky-50 transition"
                >
                  Lihat Desain
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleOrder(item.title, item.price)}
                  className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-md font-medium transition"
                  aria-label={`Pesan ${item.title}`}
                >
                  Pesan Sekarang
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Design;
