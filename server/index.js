import express from "express";
import cors from "cors";
import midtransClient from "midtrans-client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup Midtrans Snap
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Route untuk membuat transaksi
app.post("/api/create-transaction", async (req, res) => {
  try {
    const { amount, name, email } = req.body;

    const parameter = {
      transaction_details: {
        order_id: "ORDER-" + Math.floor(Math.random() * 1000000),
        gross_amount: amount,
      },
      credit_card: { secure: true },
      customer_details: {
        first_name: name,
        email: email,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    res.json({ token: transaction.token });
  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
