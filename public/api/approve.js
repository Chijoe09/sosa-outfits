// api/approve.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { paymentId } = req.body;
  const apiKey = process.env.PI_API_KEY;
  try {
    const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${apiKey}` }
    });
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
