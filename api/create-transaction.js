import midtransClient from "midtrans-client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, name, email } = req.body;

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const orderId = "ORDER-" + Math.floor(Math.random() * 1000000);

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      credit_card: { secure: true },
      customer_details: {
        first_name: name,
        email: email,
      },
      callbacks: {
        finish: `https://invity-digital-invitations.vercel.app/success?order_id=${orderId}`,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    res.status(200).json({ token: transaction.token, order_id: orderId });
  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({ error: error.message });
  }
}
