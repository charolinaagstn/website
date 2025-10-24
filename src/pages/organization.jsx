import React from "react";
import { motion } from "framer-motion";

const members = [
  { role: "Komisaris Utama", name: "CHAROLINA AGUSTIN", photo: "/charolin.jpg" },
  { role: "CEO", name: "ANGELICA AULIA SANDI", photo: "/angel.jpg" },
  { role: "Direktur Keuangan", name: "ARIYA LITA", photo: "/lita.jpg" },
  { role: "Direktur Pemasaran", name: "SUNDARI WELAS ASIH", photo: "/cun.jpg" },
  { role: "Direktur Kebijakan", name: "SITI MAHLIANI PUTRI SIREGAR", photo: "/siti.jpg" },
  { role: "Direktur Sistem Operasi", name: "MEISYA ANDELA FITRA", photo: "/meisya.jpg" },
  { role: "Direktur Pengembangan Teknologi", name: "YESA DAMAYANTI", photo: "/yesa.jpg" },
];

const gridLayout = [[0], [1], [2, 3], [4, 5], [6]];

const Organization = () => {
  return (
    <section className="text-center bg-white/40 backdrop-blur-sm p-10 rounded-4xl">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-sky-800 mb-12"
      >
        Struktur Organisasi
      </motion.h2>

      <div className="flex flex-col gap-10 items-center">
        {gridLayout.map((row, idx) => (
          <div
            key={idx}
            className={`flex gap-8 ${
              row.length === 1 ? "justify-center w-full" : "justify-center flex-wrap"
            }`}
          >
            {row.map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 w-64 border border-white/50"
              >
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden shadow-md ring-2 ring-sky-500 mb-4">
                  <img
                    src={members[index].photo}
                    alt={members[index].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-sky-900">{members[index].role}</p>
                <p className="text-gray-600 text-sm italic mt-1">({members[index].name})</p>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Organization;
