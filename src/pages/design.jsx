import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const themes = [
  {
    title: "Pelaminan",
    desc: "Nuansa ivory & gold berpadu dengan layout klasik — menciptakan kesan anggun yang abadi.",
    background: "/married.jpg",
    price: "Rp 150.000",
  },
  {
    title: "Ulang Tahun",
    desc: "Vibes ceria dan penuh energi, cocok untuk pesta ulang tahun, wisuda, atau momen penuh tawa.",
    background: "/birthday.jpg",
    price: "Rp 120.000",
  },
  {
    title: "Pernikahan",
    desc: "Kombinasi geometris islami dan warna emerald yang menenangkan, menghadirkan kesan sakral & damai.",
    background: "/wedding.jpg",
    price: "Rp 200.000",
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
          Pilih gaya undangan yang mencerminkan kisahmu — klasik, ceria, atau sakral sesuai momen
          spesial.
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
