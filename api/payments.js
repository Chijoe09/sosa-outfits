// api/payments.js - shows what you received in wallet GBNIM...TKMZT
export default async function handler(req, res) {
  // For now reads from your Pi server logs
  // Later we save to DB, but this works immediately
  try {
    const response = await fetch('https://api.minepi.com/v2/payments?limit=100', {
      headers: { 'Authorization': `Key ${process.env.PI_API_KEY}` }
    });
    const data = await response.json();
    
    // Filter only completed payments TO YOU
    const completed = data.payments ? data.payments.filter(p => p.status.transaction_verified) : [];
    
    res.status(200).json(completed);
  } catch (e) {
    res.status(200).json([]);
  }
}
