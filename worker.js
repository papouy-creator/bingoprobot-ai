export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/telegram") {
    const update = await request.json();
    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = update.message?.chat?.id;
    const message = update.message?.text;

    if (token && chatId && message === "/start") {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: "🤖 Byenvini nan BINGO AI PRO!\n\nSistèm Telegram ou konekte. Nap prepare analiz mache ak siyal trading yo."
            })
        });
    }

    return new Response("OK");
    }

    if (url.pathname === "/api/status") {
      return Response.json({
        system: "BINGO AI PRO",
        status: "ONLINE",
        market_data: "NOT_CONNECTED",
        telegram: env.TELEGRAM_BOT_TOKEN ? "CONFIGURED" : "NOT_CONFIGURED"
      });
    }

    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BINGO AI PRO</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#080e19;color:white;font-family:Arial}
header{padding:20px;background:#111c2e;border-bottom:1px solid #26364e}
h1{color:#00e6a0;margin:0;font-size:25px}
small{color:#8da4bd}
main{padding:15px;max-width:900px;margin:auto}
.card{background:#111c2e;padding:18px;border-radius:12px;margin:15px 0}
label{display:block;color:#9aafc6;margin:12px 0 6px}
select,button{width:100%;padding:13px;border-radius:8px;border:1px solid #344762;background:#1b2a40;color:white}
button{background:#00b982;color:#001b13;font-weight:bold;margin-top:15px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.signal{text-align:center;padding:25px;font-size:23px;color:#00e6a0}
.status{color:#ffca62}
</style>
</head>
<body>
<header>
<h1>🤖 BINGO AI PRO</h1>
<small>INTELLIGENT MARKET ANALYSIS</small>
</header>
<main>
<div class="card">
<h3>📊 MARKET CONFIGURATION</h3>
<div class="grid">
<div>
<label>Market</label>
<select id="market">
<option>NORMAL</option>
<option>OTC</option>
</select>
</div>
<div>
<label>Currency Pair</label>
<select id="pair">
<option>EUR/USD</option>
<option>GBP/USD</option>
<option>USD/JPY</option>
<option>AUD/USD</option>
<option>EUR/JPY</option>
</select>
</div>
<div>
<label>Timeframe</label>
<select id="timeframe">
<option>M1</option>
<option>M5</option>
<option>M15</option>
</select>
</div>
<div>
<label>Expiration</label>
<select id="expiration">
<option>1 MINUTE</option>
<option>5 MINUTES</option>
<option>15 MINUTES</option>
</select>
</div>
</div>
<button onclick="analyze()">ANALYZE MARKET</button>
</div>

<div class="card">
<h3>📈 MARKET ANALYSIS</h3>
<div class="signal" id="signal">WAITING FOR DATA</div>
<p id="details" class="status">
Market data not connected. No live signal available.
</p>
</div>

<div class="card">
<h3>🧠 TECHNICAL INDICATORS</h3>
<p>EMA 20 / 50: Waiting for data</p>
<p>RSI 14: Waiting for data</p>
<p>MACD: Waiting for data</p>
<p>PRICE ACTION: Waiting for data</p>
</div>

<div class="card">
<h3>📲 TELEGRAM</h3>
<p id="telegram">Checking connection...</p>
<p><small>Signals will be enabled after connecting a verified market data feed.</small></p>
</div>
</main>
<script>
async function analyze(){
 document.getElementById("signal").textContent="ANALYZING...";
 document.getElementById("details").textContent=
 "Waiting for a verified live market data connection.";
 setTimeout(()=>{
 document.getElementById("signal").textContent="NO SIGNAL";
 document.getElementById("details").textContent=
 "No market data available. Avoid entering a trade.";
 },700);
}
fetch("/api/status").then(r=>r.json()).then(d=>{
 document.getElementById("telegram").textContent=
 "Telegram: "+d.telegram+" | Market feed: "+d.market_data;
}).catch(()=>{});
</script>
</body>
</html>`, {
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  }
};
