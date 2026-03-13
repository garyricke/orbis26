exports.handler = async () => {
  const SHEET_URL =
    'https://docs.google.com/spreadsheets/d/1ejlVlerXI9neFPSCdhoqerI79RCK3czNsmgdNUTSRv8/export?format=csv&gid=0';

  try {
    const res = await fetch(SHEET_URL, { redirect: 'follow' });
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const csv = await res.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, s-maxage=300', // cache 5 min on CDN
      },
      body: csv,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
