export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("BINGOPROBOT AI ONLINE");
    }

    if (url.pathname === "/telegram" && request.method === "POST") {
      const update = await request.json();
      const msg = update.message;

      if (!msg || !msg.text) {
        return new Response("OK");
      }

      let text = "Kòmand pa rekonèt. Tape /help";

      if (msg.text === "/start") {
        text = "🤖 BINGOPROBOT AI\n\nBot la konekte!";
      }

      if (msg.text === "/help") {
        text = "/start - Kòmanse\n/status - Verifye bot la";
      }

      if (msg.text === "/status") {
        text = "✅ BINGOPROBOT AI ACTIVE";
      }

      await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: msg.chat.id,
            text: text
          })
       
