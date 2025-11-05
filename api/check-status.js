import midtransClient from "midtrans-client";

export default async function handler(req, res) {
  try {
    const order_id =
      req.method === "POST" ? req.body.order_id : req.query.order_id;

    if (!order_id) {
      return res.status(400).json({ error: "Missing order_id" });
    }

    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const statusResponse = await core.transaction.status(order_id);
    console.log("💬 Status Response:", statusResponse);

    res.status(200).json({
      order_id: statusResponse.order_id,
      transaction_status: statusResponse.transaction_status,
      fraud_status: statusResponse.fraud_status,
      payment_type: statusResponse.payment_type,
    });
  } catch (error) {
    console.error("Check Status Error:", error);
    res.status(500).json({ error: error.message });
  }
}
